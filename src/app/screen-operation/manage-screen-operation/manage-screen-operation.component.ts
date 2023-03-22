import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ScreenOperation } from '@core/domain-classes/screen-operation';
import { Screen } from '@core/domain-classes/screen';
import { Operation } from '@core/domain-classes/operation';
import { Observable } from 'rxjs';
import { ScreenService } from '@core/services/screen.service';
import { OperationService } from '@core/services/operation.service';
import { ScreenOperationService } from '@core/services/screen-operation.service';

@Component({
  selector: 'app-manage-screen-operation',
  templateUrl: './manage-screen-operation.component.html',
  styleUrls: ['./manage-screen-operation.component.css']
})
export class ManageScreenOperationComponent implements OnInit {
  screenOperations$: Observable<ScreenOperation[]>
  screens$: Observable<Screen[]>;
  operations$: Observable<Operation[]>;
  loading$: Observable<boolean>;
  loadingScreen$: Observable<boolean>;
  loadingOperation$: Observable<boolean>;

  constructor(
    private screenService: ScreenService,
    private operationService: OperationService,
    private screenOperationService: ScreenOperationService) {

  }

  ngOnInit(): void {

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
    this.screenOperations$ = this.screenOperationService.entities$;
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

  onAddScreenOperation(screenOperation: ScreenOperation): void {

    this.screenOperationService.add(screenOperation);
    // TODO: save screen operation
  }

  onDeleteScreenOperation(screenOperation: ScreenOperation) {
    this.screenOperationService.delete(screenOperation.id);
  }

}
