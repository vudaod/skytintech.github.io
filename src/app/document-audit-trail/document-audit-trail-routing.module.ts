import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { DocumentAuditTrailComponent } from './document-audit-trail.component';

const routes: Routes = [
  {
    path:'',
    component: DocumentAuditTrailComponent,
    data: { claimType: 'document_audit_trail_view_document_audit_trail' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentAuditTrailRoutingModule { }
