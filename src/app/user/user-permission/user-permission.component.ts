import { Component, OnInit } from '@angular/core';
import { Operation } from '@core/domain-classes/operation';
import { ScreenOperation } from '@core/domain-classes/screen-operation';
import { Screen } from '@core/domain-classes/screen';
import { OperationService } from '@core/services/operation.service';
import { ScreenOperationService } from '@core/services/screen-operation.service';
import { ScreenService } from '@core/services/screen.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '@core/domain-classes/user';
import { UserService } from '../user.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent extends BaseComponent implements OnInit {

  screenOperations$: Observable<ScreenOperation[]>
  screens$: Observable<Screen[]>;
  operations$: Observable<Operation[]>;
  loading$: Observable<boolean>;
  loadingScreen$: Observable<boolean>;
  loadingOperation$: Observable<boolean>;
  user: User;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private screenService: ScreenService,
    private operationService: OperationService,
    private screenOperationService: ScreenOperationService,
    private userService: UserService,
    private translationService: TranslationService) {
    super();
  }

  ngOnInit(): void {
    this.sub$.sink = this.activeRoute.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      });

    this.loadingOperation$ = this.operationService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getOperations();
          }
        })
      )
    this.operations$ = this.operationService.entities$

    this.loadingScreen$ = this.screenService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getScreens();
          }
        })
      )
    this.screens$ = this.screenService.entities$
    this.loading$ = this.screenOperationService.loaded$
    this.screenOperations$ = this.screenOperationService.entities$
    this.getScreenOperations();

  }

  getOperations(): void {
    this.operationService.getAll();
  }

  getScreens(): void {
    this.screenService.getAll();
  }

  getScreenOperations(): void {
    this.screenOperationService.getAll();
  }

  manageUserClaimOperation(user: User): void {
    this.sub$.sink = this.userService.updateUserClaim(user.userClaims, user.id).subscribe(() => {
      this.toastrService.success(this.translationService.getValue('USER_PERMISSION_UPDATED_SUCCESSFULLY'));
      this.router.navigate(['/users']);
    })
  }
}
