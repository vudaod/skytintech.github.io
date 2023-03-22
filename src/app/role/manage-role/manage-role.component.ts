import { Component, OnInit } from '@angular/core';
import { Operation } from '@core/domain-classes/operation';
import { ScreenOperation } from '@core/domain-classes/screen-operation';
import { Screen } from '@core/domain-classes/screen';
import { OperationService } from '@core/services/operation.service';
import { ScreenOperationService } from '@core/services/screen-operation.service';
import { ScreenService } from '@core/services/screen.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { RoleService } from '../role.service';
import { Role } from '@core/domain-classes/role';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent extends BaseComponent implements OnInit {
  screenOperations$: Observable<ScreenOperation[]>
  screens$: Observable<Screen[]>;
  operations$: Observable<Operation[]>;
  loading$: Observable<boolean>;
  loadingScreen$: Observable<boolean>;
  loadingOperation$: Observable<boolean>;
  role: Role;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private screenService: ScreenService,
    private operationService: OperationService,
    private screenOperationService: ScreenOperationService,
    private roleService: RoleService,
    private translationService:TranslationService) {
    super();
  }

  ngOnInit(): void {
    this.sub$.sink = this.activeRoute.data.subscribe(
      (data: { role: Role }) => {
        if (data.role) {
          this.role = data.role;
        } else {
          this.role = {
            roleClaims: [],
            userRoles: []
          };
        }
      });

    this.loadingOperation$ = this.operationService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getOperations();
          }
        })
      )
    this.operations$ = this.operationService.entities$

    this.loadingScreen$ = this.screenService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getScreens();
          }
        })
      )
    this.screens$ = this.screenService.entities$
    this.loading$ = this.screenOperationService.loaded$
    this.screenOperations$ = this.screenOperationService.entities$
    this.getScreenOperations();

  }

  getOperations(): void {
    this.operationService.getAll();
  }

  getScreens(): void {
    this.screenService.getAll();
  }

  getScreenOperations(): void {
    this.screenOperationService.getAll();
  }

  manageRole(role: Role): void {
    if (!role.name) {
      this.toastrService.error(this.translationService.getValue('PLEASE_ENTER_ROLE_NAME'));
      return;
    }

    if (role.roleClaims.length == 0) {
      this.toastrService.error(this.translationService.getValue('PLEASE_SELECT_AT_LEAT_ONE_PERMISSION'));
      return;
    }

    if (!role.id)
      this.sub$.sink = this.roleService.addRole(role).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('ROLE_SAVED_SUCCESSFULLY'));
        this.router.navigate(['/roles']);
      });
    else
      this.sub$.sink = this.roleService.updateRole(role).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('ROLE_UPDATED_SUCCESSFULLY'));
        this.router.navigate(['/roles']);
      });
  }
}
