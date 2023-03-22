import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationListPresentationComponent } from './operation-list-presentation.component';

describe('OperationListPresentationComponent', () => {
  let component: OperationListPresentationComponent;
  let fixture: ComponentFixture<OperationListPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationListPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationListPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
