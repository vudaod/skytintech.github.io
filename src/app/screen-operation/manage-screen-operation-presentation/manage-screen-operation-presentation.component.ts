import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Operation } from '@core/domain-classes/operation';
import { Screen } from '@core/domain-classes/screen';
import { ScreenOperation } from '@core/domain-classes/screen-operation';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-manage-screen-operation-presentation',
  templateUrl: './manage-screen-operation-presentation.component.html',
  styleUrls: ['./manage-screen-operation-presentation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageScreenOperationPresentationComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() screens: Screen[];
  @Input() operations: Operation[];
  @Input() screenOperations: ScreenOperation[];
  @Input() loading: boolean;
  @Input() loadingScreen: boolean;
  @Input() loadingOperation: boolean;
  screenOperationForm: UntypedFormGroup;

  @Output() addScreenOperation: EventEmitter<ScreenOperation> = new EventEmitter<ScreenOperation>();
  @Output() deleteScreenOperation: EventEmitter<ScreenOperation> = new EventEmitter<ScreenOperation>();


  get screenOperationArray(): UntypedFormArray {
    return <UntypedFormArray>this.screenOperationForm.get('screenOperationArray');
  }

  constructor(private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createScreenOperationForm();
    // setTimeout(() => {
    //   this.patchScreenOperationForm();
    // }, 1000)
  }

  ngOnChanges(changes: SimpleChanges) {
    // let change = changes["loading"];
    // if (change) {
    //   this.patchScreenOperationForm();
    // }
  }

  createScreenOperationForm() {
    this.screenOperationForm = this.fb.group({
      screenOperationArray: this.fb.array([])
    });
  }

  onCheck(screenId: string, operationId: string): boolean {
    const screenOperation = this.screenOperations.find(c => c.screenId === screenId && c.operationId === operationId);
    if (screenOperation) {
      return true;
    } else {
      return false;
    }
  }

  patchScreenOperationForm() {
    this.screens.forEach(screen => {
      this.operations.forEach(operation => {
        const screenOperation = this.screenOperations.find(c => c.screenId === screen.id && c.operationId === operation.id);
        let id = null;
        if (screenOperation) {
          id = screenOperation.id;
        }
        this.screenOperationArray.push(
          this.fb.group({
            id: [id],
            screenId: [screen.id],
            screenName: [screen.name],
            operationId: [operation.id],
            operationName: [operation.name],
            flag: id ? true : false
          })
        )
      })
    })
  }

  onScreenOperationChange(flag: MatSlideToggleChange, screenId: string, operationId: string) {
    if (flag.checked) {
      const screenOperation: ScreenOperation = {
        screenId: screenId,
        operationId: operationId
      }
      this.addScreenOperation.emit(screenOperation);
    } else {
      const screenOperation = this.screenOperations.find(c => c.operationId === operationId && c.screenId === screenId);
      if (screenOperation) {
        this.deleteScreenOperation.emit(screenOperation);
      }
    }
  }
}
