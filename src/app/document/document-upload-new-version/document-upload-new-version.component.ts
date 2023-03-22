import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentInfo } from '@core/domain-classes/document-info';
import { DocumentVersion } from '@core/domain-classes/documentVersion';
import { FileInfo } from '@core/domain-classes/file-info';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-upload-new-version',
  templateUrl: './document-upload-new-version.component.html',
  styleUrls: ['./document-upload-new-version.component.css']
})
export class DocumentUploadNewVersionComponent extends BaseComponent implements OnInit {
  documentForm: UntypedFormGroup;
  extension: string = '';
  isFileUpload: boolean = false;
  showProgress: boolean = false;
  progress: number = 0;
  fileInfo: FileInfo;
  constructor(
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient,
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialogRef<DocumentUploadNewVersionComponent>,
    private documentService: DocumentService,
    private toastrService: ToastrService,
    private translationService: TranslationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createDocumentForm();
  }

  createDocumentForm() {
    this.documentForm = this.fb.group({
      url: ['', [Validators.required]],
      fileSize: ['', [Validators.required]],
      extension: ['', [Validators.required]]
    });
  }



  upload(files) {
    if (files.length === 0)
      return;
    this.extension = files[0].name.split('.').pop();
    this.showProgress = true;
    if (!this.fileExtesionValidation(this.extension)) {
      this.fileUploadExtensionValidation('');
      this.showProgress = false;
      this.cd.markForCheck();
      return;
    } else {
      this.fileUploadExtensionValidation('valid');
    }
    const size = files[0].size;
    // if (size > environment.maximumFileSize) {
    //   this.fileUploadSizeValidation('');
    //   this.showProgress = false;
    //   this.cd.markForCheck();
    //   return;
    // } else {
    //   this.fileUploadSizeValidation('valid');
    // }
    this.fileUploadSizeValidation('valid')
    const formData = new FormData();
    for (let file of files)
      formData.append(file.name, file);
    const uploadReq = new HttpRequest('POST', `api/document/upload`, formData, {
      reportProgress: true,
    });

    this.sub$.sink = this.httpClient.request(uploadReq)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.cd.markForCheck();
        }
        else if (event.type === HttpEventType.Response) {
          this.fileInfo = event.body as FileInfo;
          this.fileUploadValidation(this.fileInfo.fileName);
          this.isFileUpload = true;
          this.cd.markForCheck();
        }
      });
  }

  fileUploadValidation(fileName: string) {
    this.documentForm.patchValue({
      url: fileName
    })
    this.documentForm.get('url').markAsTouched();
    this.documentForm.updateValueAndValidity();
  }

  fileUploadSizeValidation(fileSize: string) {
    this.documentForm.patchValue({
      fileSize: fileSize
    })
    this.documentForm.get('fileSize').markAsTouched();
    this.documentForm.updateValueAndValidity();
  }

  fileUploadExtensionValidation(extension: string) {
    this.documentForm.patchValue({
      extension: extension
    })
    this.documentForm.get('extension').markAsTouched();
    this.documentForm.updateValueAndValidity();
  }

  fileExtesionValidation(extesion: string): boolean {
    const allowExtesions = environment.allowExtesions;
    var allowTypeExtenstion = allowExtesions.find(c => c.extentions.find(ext => ext === extesion));
    return allowTypeExtenstion ? true : false;
  }

  SaveDocument() {
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    }
    const documentversion: DocumentVersion = {
      documentId: this.data.id,
      url: this.documentForm.get('url').value
    };
    this.sub$.sink = this.documentService.saveNewVersionDocument(documentversion)
      .subscribe((documentInfo: DocumentInfo) => {
        this.toastrService.success(this.translationService.getValue('DOCUMENT_SAVE_SUCCESSFULLY'));
        this.dialogRef.close();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
