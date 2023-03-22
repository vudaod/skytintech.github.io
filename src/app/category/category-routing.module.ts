import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path:'',
    component: CategoryListComponent,
    data: { claimType: 'document_category_view_categories' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
