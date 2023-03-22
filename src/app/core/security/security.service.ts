import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { UserAuth } from '../domain-classes/user-auth';
import { CommonHttpErrorService } from '../error-handler/common-http-error.service';
import { ClonerService } from '../services/clone.service';
import { CommonError } from '../error-handler/common-error';
import { User } from '@core/domain-classes/user';
import { Router } from '@angular/router';


@Injectable(
  { providedIn: 'root' }
)
export class SecurityService {
  securityObject: UserAuth = new UserAuth();
  private securityObject$: BehaviorSubject<UserAuth> = new BehaviorSubject<UserAuth>(null);
  public get SecurityObject(): Observable<UserAuth> {
    return this.securityObject$.asObservable();
  }
  constructor(
    private http: HttpClient,
    private clonerService: ClonerService,
    private commonHttpErrorService: CommonHttpErrorService,
    private router: Router
  ) {

  }
  isUserAuthenticate(): boolean {
    if (this.securityObject.userName && this.securityObject.bearerToken) {
      return true;
    } else {
      return this.parseSecurityObj();
    }
  }

  login(entity: User): Observable<UserAuth | CommonError> {
    // Initialize security object
    this.resetSecurityObject();
    return this.http.post<UserAuth>('user/login', entity)
      .pipe(
        tap((resp) => {
          this.securityObject = this.clonerService.deepClone<UserAuth>(resp);
          localStorage.setItem('authObj', JSON.stringify(this.securityObject));
          localStorage.setItem('bearerToken', this.securityObject.bearerToken);
          this.securityObject$.next(resp);
        })
      ).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  private parseSecurityObj(): boolean {
    const securityObjectString = localStorage.getItem('authObj');
    if (!securityObjectString) {
      return false;
    }
    const secuObj = JSON.parse(securityObjectString);
    this.securityObject = this.clonerService.deepClone<UserAuth>(secuObj);
    if (this.securityObject.userName && this.securityObject.bearerToken) {
      this.securityObject$.next(this.securityObject);
      return true;
    }
    return false;
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.firstName = '';
    this.securityObject.lastName = '';
    this.securityObject.claims = [];
    localStorage.removeItem('authObj');
    localStorage.removeItem('bearerToken');
    this.securityObject$.next(null);
    this.router.navigate(['/login']);
  }

  // This method can be called a couple of different ways
  // *hasClaim="'claimType'"  // Assumes claimValue is true
  // *hasClaim="'claimType:value'"  // Compares claimValue to value
  // *hasClaim="['claimType1','claimType2:value','claimType3']"
  // tslint:disable-next-line: typedef
  hasClaim(claimType: any, claimValue?: any): boolean {
    let ret = false;
    // See if an array of values was passed in.
    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;
      if (claims) {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }
    return ret;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret = false;
    let auth: UserAuth = null;
    // Retrieve security object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(':') >= 0) {
        const words: string[] = claimType.split(':');
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : 'true';
      }
      // Attempt to find the claim
      ret =
        auth.claims.find(
          (c) =>
            c.claimType.toLowerCase() == claimType && c.claimValue == claimValue
        ) != null;
    }

    return ret;
  }

  getUserDetail(): UserAuth {
    var userJson = localStorage.getItem('authObj');
    return JSON.parse(userJson);
  }

  setUserDetail(user: UserAuth) {
    this.securityObject = this.clonerService.deepClone<UserAuth>(user);
    localStorage.setItem('authObj', JSON.stringify(this.securityObject));
  }
}
