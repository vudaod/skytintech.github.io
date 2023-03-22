import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Screen } from '@core/domain-classes/screen';
import { ScreenService } from '@core/services/screen.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-manage-screen',
  templateUrl: './manage-screen.component.html',
  styleUrls: ['./manage-screen.component.css']
})
export class ManageScreenComponent extends BaseComponent implements OnChanges {

  isEdit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ManageScreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Screen,
    private screenService: ScreenService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] != null) {
      if (this.data.id) {
        this.isEdit = true;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveScreen(): void {
    if (this.data.id) {
      this.screenService.update(this.data);
    } else {
      this.screenService.add(this.data);
    }
    this.dialogRef.close();
  }
}
