import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentRoutingModule } from './document-routing.module';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentManageComponent } from './document-manage/document-manage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DocumentManagePresentationComponent } from './document-manage-presentation/document-manage-presentation.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocumentPermissionModule } from './document-permission/document-permission.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { SendEmailComponent } from './send-email/send-email.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DocumentReminderComponent } from './document-reminder/document-reminder.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { DocumentCommentComponent } from './document-comment/document-comment.component';
import { DocumentUploadNewVersionComponent } from './document-upload-new-version/document-upload-new-version.component';
import { DocumentVersionHistoryComponent } from './document-version-history/document-version-history.component';


@NgModule({
  declarations: [
    DocumentListComponent,
    DocumentManageComponent,
    DocumentManagePresentationComponent,
    DocumentEditComponent,
    SendEmailComponent,
    DocumentReminderComponent,
    DocumentCommentComponent,
    DocumentUploadNewVersionComponent,
    DocumentVersionHistoryComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatProgressBarModule,
    DocumentPermissionModule,
    MatCheckboxModule,
    MatMenuModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatRadioModule
  ]
})
export class DocumentModule { }
