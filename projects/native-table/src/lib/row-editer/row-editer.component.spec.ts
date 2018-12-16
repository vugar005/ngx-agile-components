/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RowEditerComponent } from './row-editer.component';

describe('RowEditerComponent', () => {
  let component: RowEditerComponent;
  let fixture: ComponentFixture<RowEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
