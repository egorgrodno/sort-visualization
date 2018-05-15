import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmArraySizeComponent } from './confirm-array-size.component';

describe('ConfirmArraySizeComponent', () => {
  let component: ConfirmArraySizeComponent;
  let fixture: ComponentFixture<ConfirmArraySizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmArraySizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmArraySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
