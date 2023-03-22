import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Operation } from '@core/domain-classes/operation';
import { ScreenOperation } from '@core/domain-classes/screen-operation';
import { User } from '@core/domain-classes/user';
import { Screen } from '@core/domain-classes/screen';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-user-permission-presentation',
  templateUrl: './user-permission-presentation.component.html',
  styleUrls: ['./user-permission-presentation.component.css']
})
export class UserPermissionPresentationComponent implements OnInit {

  @Input() screens: Screen[];
  @Input() operations: Operation[];
  @Input() screenOperations: ScreenOperation[];
  @Input() loading: boolean;
  @Input() loadingScreen: boolean;
  @Input() loadingOperation: boolean;
  @Input() user: User;
  @Output() manageUserClaimOperation: EventEmitter<User> = new EventEmitter<User>();
  step: number = 0;
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

  onPageSelect(event: MatCheckboxChange, screenName: string) {
    if (event.checked) {
      this.screens.filter(c => c.name == screenName).forEach(screen => {
        this.operations.forEach(operation => {
          if (this.checkPageAction(screen.id, operation.id)) {
            this.user.userClaims.push({
              userId: this.user.id,
              claimType: `${screen.name}_${operation.name}`,
              claimValue: '',
              screenId: screen.id,
              operationId: operation.id
            });
          }
        });
      });
    } else {
      var screen = this.screens.find(c => c.name == screenName);
      this.user.userClaims = this.user.userClaims.filter(c => c.screenId != screen.id);
    }
  }

  checkPermission(screenId: string, operationId: string): boolean {
    const pageAction = this.user.userClaims.find(c => c.screenId === screenId && c.operationId === operationId);
    if (pageAction) {
      return true;
    } else {
      return false;
    }
  }

  onPermissionChange(flag: MatSlideToggleChange, screen: Screen, operation: Operation) {
    if (flag.checked) {
      this.user.userClaims.push({
        userId: this.user.id,
        claimType: `${screen.name}_${operation.name}`,
        claimValue: '',
        screenId: screen.id,
        operationId: operation.id
      })
    } else {
      const roleClaimToRemove = this.user.userClaims.find(c => c.operationId === operation.id && c.screenId === screen.id);
      const index = this.user.userClaims.indexOf(roleClaimToRemove, 0);
      if (index > -1) {
        this.user.userClaims.splice(index, 1);
      }
    }
  }

  saveUserClaim(): void {
    this.manageUserClaimOperation.emit(this.user);
  }
}
