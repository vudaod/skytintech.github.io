import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenListPresentationComponent } from './screen-list-presentation.component';

describe('ScreenListPresentationComponent', () => {
  let component: ScreenListPresentationComponent;
  let fixture: ComponentFixture<ScreenListPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenListPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenListPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
