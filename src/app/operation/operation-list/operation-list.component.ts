import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { Operation } from '@core/domain-classes/operation';
import { OperationService } from '@core/services/operation.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent extends BaseComponent implements OnInit {
  operations$: Observable<Operation[]>;
  loading$: Observable<boolean>;
  constructor(
    private operationService: OperationService,
    private toastrService: ToastrService) {
    super();
  }
  ngOnInit(): void {

    this.loading$ = this.operationService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getOperations();
          }
        })
      )
    this.operations$ = this.operationService.entities$
  }

  getOperations(): void {
    this.operationService.getAll();
  }

  deleteOperation(id: string): void {
    this.sub$.sink = this.operationService.delete(id).subscribe(() => {
      this.toastrService.success(`Operation Deleted Successfully.`);
    });
  }

  manageOperation(operation: Operation): void {
    if (operation.id) {
      this.sub$.sink = this.operationService.update(operation).subscribe(() => {
        this.toastrService.success(`Operation Updated Successfully.`);
      });
    } else {
      this.sub$.sink = this.operationService.add(operation).subscribe(() => {
        this.toastrService.success(`Operation Saved Successfully.`);
      });
    }

  }
}

