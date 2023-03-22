import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/document-header';
import { DocumentInfo } from '@core/domain-classes/document-info';
import { DocumentResource } from '@core/domain-classes/document-resource';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DocumentService } from '../document.service';

export class DocumentDataSource implements DataSource<DocumentInfo> {

  private documentsSubject = new BehaviorSubject<DocumentInfo[]>([]);
  private responseHeaderSubject = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public responseHeaderSubject$= this.responseHeaderSubject.asObservable();

  private _data: DocumentInfo[];
  public get data(): DocumentInfo[] {
    return this._data;
  }
  public set data(v: DocumentInfo[]) {
    this._data = v;
  }

  constructor(private documentService: DocumentService) { }

  connect(collectionViewer: CollectionViewer): Observable<DocumentInfo[]> {
    return this.documentsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.documentsSubject.complete();
    this.loadingSubject.complete();
  }

  loadDocuments(documentResource: DocumentResource) {

    this.loadingSubject.next(true);

    this.documentService.getDocuments(documentResource).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(
      (resp: HttpResponse<DocumentInfo[]>) => {
        const paginationParam = JSON.parse(
          resp.headers.get('X-Pagination')
        ) as ResponseHeader;
        this.responseHeaderSubject.next(paginationParam);
        this._data = [...resp.body];
        this.documentsSubject.next(this._data);
      }

    );
  }
}
