import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { DocumentAuditTrail } from '@core/domain-classes/document-audit-trail';
import { DocumentInfo } from '@core/domain-classes/document-info';
import { DocumentOperation } from '@core/domain-classes/document-operation';
import { DocumentView } from '@core/domain-classes/document-view';
import { CommonService } from '@core/services/common.service';
import { OVERLAY_PANEL_DATA } from '@shared/overlay-panel/overlay-panel-data';
import { OverlayPanelRef } from '@shared/overlay-panel/overlay-panel-ref';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { DocumentLibraryService } from '../../document-library/document-library.service';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent extends BaseComponent implements OnInit {
  constructor(
    private documentLibraryService: DocumentLibraryService,
    @Inject(OVERLAY_PANEL_DATA) public data: DocumentView,
    private overlayRef: OverlayPanelRef,
    private toastrService: ToastrService,
    private commonService: CommonService) {
    super();
  }
  documentUrl: string = null;
  documentInfo: DocumentInfo;
  viewerType: string = 'pdf';
  isLoading: boolean = false;
  loadingTime: number = 2000;
  public get isPdf(): boolean {
    return this.viewerType === 'pdf';
  }

  ngOnInit(): void {
    this.getDocumentById();
  }

  closeToolbar() {
    this.overlayRef.close();
  }

  getDocumentById() {
    this.isLoading = true;
    if (this.data.isRestricted) {
      this.sub$.sink = this.documentLibraryService.getDocumentLibrary(this.data.documentId)
        .subscribe(c => {
          this.isLoading = false;
          this.documentInfo = c;
          this.viewerType = this.documentInfo.viewerType;
          this.getDocumentUrl();
          this.addDocumentTrail();
        });
    }
    else {
      this.sub$.sink = this.documentLibraryService.getDocumentViewLibrary(this.data.documentId)
        .subscribe(c => {
          this.isLoading = false;
          this.documentInfo = c;
          this.viewerType = this.documentInfo.viewerType;
          this.getDocumentUrl();
          this.addDocumentTrail();
        });
    }
  }

  addDocumentTrail() {
    const objDocumentAuditTrail: DocumentAuditTrail = {
      documentId: this.documentInfo.id,
      operationName: DocumentOperation.Read.toString()
    }
    this.sub$.sink = this.commonService.addDocumentAuditTrail(objDocumentAuditTrail)
      .subscribe(c => {
      })
  }

  getDocumentUrl() {
    this.documentUrl = this.documentInfo.documentSource;
    this.loadingTime = 0;
  }

  downloadDocument() {
    this.sub$.sink = this.commonService.downloadDocument(this.documentInfo.id, this.data.isVersion).subscribe(
      (event) => {
        if (event.type === HttpEventType.Response) {
          this.downloadFile(event);
        }
      },
      (error) => {
        this.toastrService.error('error while downloading document');
      }
    );
  }

  private downloadFile(data: HttpResponse<Blob>) {
    const downloadedFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = this.documentInfo.name;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }
}
