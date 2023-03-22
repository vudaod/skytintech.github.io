import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserDetailResolverService } from './user-detail-resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: { claimType: 'user_view_users' },
    canActivate: [AuthGuard]
  }, {
    path: 'manage/:id',
    component: ManageUserComponent,
    resolve: { user: UserDetailResolverService },
    data: { claimType: 'user_edit_user' },
    canActivate: [AuthGuard]
  }, {
    path: 'manage',
    component: ManageUserComponent,
    data: { claimType: 'user_create_user' },
    canActivate: [AuthGuard]
  }, {
    path: 'permission/:id',
    component: UserPermissionComponent,
    resolve: { user: UserDetailResolverService },
    data: { claimType: 'user_assign_permission' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
