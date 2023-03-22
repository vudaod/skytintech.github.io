import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageScreenOperationComponent } from './manage-screen-operation/manage-screen-operation.component';
import { ScreenOperationRoutingModule } from './screen-operation-routing.module';
import { ManageScreenOperationPresentationComponent } from './manage-screen-operation-presentation/manage-screen-operation-presentation.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ManageScreenOperationComponent,
    ManageScreenOperationPresentationComponent],
  imports: [
    CommonModule,
    ScreenOperationRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ScreenOperationModule { }
