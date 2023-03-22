import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { BaseComponent } from 'src/app/base.component';
import { Screen } from '@core/domain-classes/screen';
import { ManageScreenComponent } from '../manage-screen/manage-screen.component';

@Component({
  selector: 'app-screen-list-presentation',
  templateUrl: './screen-list-presentation.component.html',
  styleUrls: ['./screen-list-presentation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreenListPresentationComponent extends BaseComponent implements OnInit {

  @Input() screens: Screen[];
  @Input() loading: boolean;
  @Output() addEditScreenHandler: EventEmitter<Screen> = new EventEmitter<Screen>();
  @Output() deleteScreenHandler: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = ['action', 'name'];

  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  deleteScreen(screen: Screen): void {
    this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`Are you sure you want to delete ${screen.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deleteScreenHandler.emit(screen.id);
        }
      });
  }

  manageScreen(screen: Screen): void {
    const dialogRef = this.dialog.open(ManageScreenComponent, {
      width: '250px',
      data: Object.assign({}, screen)
    });

    this.sub$.sink = dialogRef.afterClosed()
    .subscribe((result: Screen) => {
      if (result) {
        this.addEditScreenHandler.emit(result);
      }
    });
  }

}
