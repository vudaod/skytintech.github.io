import { Injectable } from '@angular/core';
import { OnlineUser } from '@core/domain-classes/online-user';
import { SecurityService } from '@core/security/security.service';
import { environment } from '@environments/environment';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClonerService } from './clone.service';

@Injectable({ providedIn: 'root' })
export class SignalrService {
  private hubConnection: signalR.HubConnection

  private _userNotification$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public get connectionId(): string {
    return this.hubConnection.connectionId;
  }

  public get userNotification$(): Observable<string> {
    return this._userNotification$.asObservable();
  }

  constructor(
    private clonerService: ClonerService,
    private toastrService: ToastrService,
    private securityService: SecurityService) { }

  public startConnection(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const host = location.host;
      const protocal = location.protocol;
      const url = environment.apiUrl === '/' ? `${protocal}//${host}/` : environment.apiUrl;

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${url}userHub`)
        .build();
      this.hubConnection
        .start()
        .then(() => {
          resolve(true)
        })
        .catch(err => {
          reject(false);
        });
    });
  }

  addUser(signalrUser: OnlineUser) {
    this.hubConnection.invoke('join', signalrUser)
      .catch(err => console.error(err));
  }


  handleMessage = () => {
    this.hubConnection.on('userLeft', (id: string) => {
    });

    this.hubConnection.on('sendNotification', (userId: string) => {
      this._userNotification$.next(userId);
    });

  }


}
