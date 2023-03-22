import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Operation } from '@core/domain-classes/operation';
import { BaseComponent } from 'src/app/base.component';
import { ManageOperationComponent } from '../manage-operation/manage-operation.component';

@Component({
  selector: 'app-operation-list-presentation',
  templateUrl: './operation-list-presentation.component.html',
  styleUrls: ['./operation-list-presentation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationListPresentationComponent extends BaseComponent implements OnInit {

  @Input() operations: Operation[];
  @Input() loading: boolean = false;
  @Output() addEditOperationHandler: EventEmitter<Operation> = new EventEmitter<Operation>();
  @Output() deleteOperationHandler: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = ['action', 'name'];
  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
  ) {
    super();
  }

  ngOnInit(): void {
  }


  deleteOperation(operation: Operation): void {
    this.sub$.sink = this.commonDialogService.deleteConformationDialog(`Are you sure you want to delete ${operation.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deleteOperationHandler.emit(operation.id);
        }
      });
  }

  manageOperation(operation: Operation): void {
    const dialogRef = this.dialog.open(ManageOperationComponent, {
      width: '250px',
      data: Object.assign({}, operation)
    });

    this.sub$.sink = dialogRef.afterClosed().subscribe((result: Operation) => {
      if (result) {
        this.addEditOperationHandler.emit(result);
      }
    });
  }

}
