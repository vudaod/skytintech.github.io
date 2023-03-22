import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Operation } from '@core/domain-classes/operation';
import { ScreenOperation } from '@core/domain-classes/screen-operation';
import { Screen } from '@core/domain-classes/screen';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Role } from '@core/domain-classes/role';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-manage-role-presentation',
  templateUrl: './manage-role-presentation.component.html',
  styleUrls: ['./manage-role-presentation.component.css']
})
export class ManageRolePresentationComponent implements OnInit {

  @Input() screens: Screen[];
  @Input() operations: Operation[];
  @Input() screenOperations: ScreenOperation[];
  @Input() loading: boolean;
  @Input() loadingScreen: boolean;
  @Input() loadingOperation: boolean;
  @Input() role: Role;
  @Output() onManageRoleOperation: EventEmitter<Role> = new EventEmitter<Role>();
  constructor() { }

  ngOnInit(): void {

  }

  checkPageAction(screenId: string, operationId: string): boolean {
    const screenOperation = this.screenOperations.find(c => c.screenId === screenId && c.operationId === operationId);
    if (screenOperation) {
      return true;
    } else {
      return false;
    }
  }

  selecetAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.screens.forEach(screen => {
        this.operations.forEach(operation => {
          if (this.checkPageAction(screen.id, operation.id)) {
            this.role.roleClaims.push({
              roleId: this.role.id,
              claimType: `${screen.name}_${operation.name}`,
              claimValue: '',
              screenId: screen.id,
              operationId: operation.id
            });
          }
        });
      });
    } else {
      this.role.roleClaims = [];
    }
  }

  checkPermission(screenId: string, operationId: string): boolean {
    const pageAction = this.role.roleClaims.find(c => c.screenId === screenId && c.operationId === operationId);
    if (pageAction) {
      return true;
    } else {
      return false;
    }
  }

  onPermissionChange(flag: MatSlideToggleChange, screen: Screen, operation: Operation) {
    if (flag.checked) {
      this.role.roleClaims.push({
        roleId: this.role.id,
        claimType: `${screen.name}_${operation.name}`,
        claimValue: '',
        screenId: screen.id,
        operationId: operation.id
      })
    } else {
      const roleClaimToRemove = this.role.roleClaims.find(c => c.operationId === operation.id && c.screenId === screen.id);
      const index = this.role.roleClaims.indexOf(roleClaimToRemove, 0);
      if (index > -1) {
        this.role.roleClaims.splice(index, 1);
      }
    }
  }

  onPageSelect(event: MatCheckboxChange, pageName: string) {
    if (event.checked) {
      this.screens.filter(c => c.name == pageName).forEach(screen => {
        this.operations.forEach(operation => {
          if (this.checkPageAction(screen.id, operation.id)) {
            this.role.roleClaims.push({
              roleId: this.role.id,
              claimType: `${screen.name}_${operation.name}`,
              claimValue: '',
              screenId: screen.id,
              operationId: operation.id
            });
          }
        });
      });
    } else {
      var screen = this.screens.find(c => c.name == pageName);
      this.role.roleClaims = this.role.roleClaims.filter(c => c.screenId != screen.id);
    }
  }

  saveRole(): void {
    this.onManageRoleOperation.emit(this.role);
  }
}
