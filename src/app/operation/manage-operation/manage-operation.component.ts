import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base.component';
import { Operation } from '@core/domain-classes/operation';
import { OperationService } from '@core/services/operation.service';

@Component({
  selector: 'app-manage-operation',
  templateUrl: './manage-operation.component.html',
  styleUrls: ['./manage-operation.component.css']
})
export class ManageOperationComponent extends BaseComponent implements  OnChanges {
  isEdit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ManageOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Operation,
    private operationService: OperationService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data.id) {
        this.isEdit = true;
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveOperation(): void {
    if (this.data.id) {
      this.operationService.update(this.data);
    } else {
      this.operationService.add(this.data);
    }
    this.dialogRef.close();
  }

}
