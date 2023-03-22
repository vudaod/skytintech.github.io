import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module')
        .then(m => m.LoginModule)
  }, {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./document-library/document-library.module')
            .then(m => m.DocumentLibraryModule)
      }, {
        path: 'my-profile',
        component: MyProfileComponent,
        canActivate: [AuthGuard],
      }, {
        path: 'dashboard',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      }, {
        path: 'operations',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./operation/operation.module')
            .then(m => m.OperationModule)
      }, {
        path: 'screens',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./screen/screen.module')
            .then(m => m.ScreenModule)
      }, {
        path: 'screen-operation',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./screen-operation/screen-operation.module')
            .then(m => m.ScreenOperationModule)
      },
      {
        path: 'roles',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./role/role.module')
            .then(m => m.RoleModule)
      }, {
        path: 'users',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./user/user.module')
            .then(m => m.UserModule)
      },
      {
        path: 'categories',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./category/category.module')
            .then(m => m.CategoryModule)
      },
      {
        path: 'documents',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./document/document.module')
            .then(m => m.DocumentModule)
      },
      {
        path: 'document-audit-trails',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./document-audit-trail/document-audit-trail.module')
            .then(m => m.DocumentAuditTrailModule)
      }, {
        path: 'login-audit',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./login-audit/login-audit.module')
            .then(m => m.LoginAuditModule)
      }, {
        path: 'notifications',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./notification/notification.module')
            .then(m => m.NotificationModule)
      },
      {
        path: 'reminders',
        loadChildren: () => import('./reminder/reminder.module').then(m => m.ReminderModule)
      },
      {
        path: 'email-smtp',
        loadChildren: () => import('./email-smtp-setting/email-smtp-setting.module')
        .then(m => m.EmailSmtpSettingModule)
      },
      {
        path: '**',
        redirectTo: '/'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
