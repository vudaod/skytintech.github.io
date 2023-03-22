import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/document-header';
import { DocumentResource } from '@core/domain-classes/document-resource';
import { UserNotification } from '@core/domain-classes/notification';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationService } from './notification.service';

export class NotificationDataSource implements DataSource<UserNotification> {

  private notificationsSubject = new BehaviorSubject<UserNotification[]>([]);
  private responseHeaderSubject = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;


  public get count(): number {
    return this._count;
  }

  public responseHeaderSubject$ = this.responseHeaderSubject.asObservable();

  constructor(private notificationService: NotificationService) { }

  connect(collectionViewer: CollectionViewer): Observable<UserNotification[]> {
    return this.notificationsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.notificationsSubject.complete();
    this.loadingSubject.complete();
  }

  loadNotifications(documentResource: DocumentResource) {
    this.loadingSubject.next(true);
    this.notificationService.getNotifications(documentResource).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(
        (resp: HttpResponse<UserNotification[]>) => {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this.responseHeaderSubject.next(paginationParam);
          const notifications = [...resp.body];
          this._count = notifications.length;
          this.notificationsSubject.next(notifications);
        }
      );
  }
}
