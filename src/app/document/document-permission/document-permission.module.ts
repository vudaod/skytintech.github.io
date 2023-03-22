import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentPermissionListComponent } from './document-permission-list/document-permission-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { DocumentPermissionRoutingModule } from './document-permission-routing.module';
import { ManageUserPermissionComponent } from './manage-user-permission/manage-user-permission.component';
import { ManageRolePermissionComponent } from './manage-role-permission/manage-role-permission.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentPermissionService } from './document-permission.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DocumentPermissionMultipleComponent } from './document-permission-multiple/document-permission-multiple.component';
import {MatChipsModule} from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    DocumentPermissionListComponent,
    ManageUserPermissionComponent,
    ManageRolePermissionComponent,
    DocumentPermissionMultipleComponent],
  imports: [
    DocumentPermissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule,
    MatChipsModule,
    TranslateModule
  ],
  exports: [
    DocumentPermissionListComponent,
    ManageUserPermissionComponent,
    ManageRolePermissionComponent,
    DocumentPermissionMultipleComponent
  ],
  providers: [
    DocumentPermissionService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class DocumentPermissionModule { }
