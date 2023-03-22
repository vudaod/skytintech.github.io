import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScreenOperationComponent } from './manage-screen-operation.component';

describe('ManageScreenOperationComponent', () => {
  let component: ManageScreenOperationComponent;
  let fixture: ComponentFixture<ManageScreenOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageScreenOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageScreenOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
