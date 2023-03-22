import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { ManageScreenOperationComponent } from './manage-screen-operation/manage-screen-operation.component';

const routes: Routes = [
  {
    path: '',
    component: ManageScreenOperationComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenOperationRoutingModule { }
