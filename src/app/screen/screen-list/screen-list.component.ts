import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Screen } from '@core/domain-classes/screen';
import { BaseComponent } from 'src/app/base.component';
import { ScreenService } from '@core/services/screen.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent extends BaseComponent implements OnInit {
  screens$: Observable<Screen[]>;
  displayedColumns: string[] = ['action', 'name'];
  loading$: Observable<boolean>;

  constructor(
    private screenService: ScreenService,
    private toastrServoce: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.loading$ = this.screenService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getScreens();
          }
        })
      );

    this.screens$ = this.screenService.entities$;

  }

  deleteScreen(screenId: number) {
    this.sub$.sink = this.screenService.delete(screenId).subscribe(() => {
      this.toastrServoce.success(`Screen Deleted Successfully.`);
    })
  }

  manageScreen(screen: Screen): void {
    if (screen.id) {
      this.sub$.sink = this.screenService.update(screen).subscribe(() => {
        this.toastrServoce.success(`Screen Updated Successfully.`);
      });
    } else {
      this.sub$.sink = this.screenService.add(screen).subscribe(() => {
        this.toastrServoce.success(`Screen Added Successfully.`);
      });
    }

  }

  getScreens(): void {
    this.screenService.getAll()
  }

}
