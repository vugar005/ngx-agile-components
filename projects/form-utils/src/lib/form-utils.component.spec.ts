import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUtilsComponent } from './form-utils.component';

describe('FormUtilsComponent', () => {
  let component: FormUtilsComponent;
  let fixture: ComponentFixture<FormUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
