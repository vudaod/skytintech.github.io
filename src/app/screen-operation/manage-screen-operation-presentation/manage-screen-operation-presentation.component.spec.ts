import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScreenOperationPresentationComponent } from './manage-screen-operation-presentation.component';

describe('ManageScreenOperationPresentationComponent', () => {
  let component: ManageScreenOperationPresentationComponent;
  let fixture: ComponentFixture<ManageScreenOperationPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageScreenOperationPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageScreenOperationPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
