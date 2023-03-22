import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScreenComponent } from './manage-screen.component';

describe('ManageScreenComponent', () => {
  let component: ManageScreenComponent;
  let fixture: ComponentFixture<ManageScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
