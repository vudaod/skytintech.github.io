import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationListComponent } from './operation-list/operation-list.component';
import { OperationRoutingModule } from './operation-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ManageOperationComponent } from './manage-operation/manage-operation.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { OperationListPresentationComponent } from './operation-list-presentation/operation-list-presentation.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    OperationListComponent,
    ManageOperationComponent,
    OperationListPresentationComponent],
  imports: [
    CommonModule,
    FormsModule,
    OperationRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule
  ]

})
export class OperationModule { }
