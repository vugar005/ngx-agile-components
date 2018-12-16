/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableDataInsertComponent } from './table-data-insert.component';

describe('TableDataInsertComponent', () => {
  let component: TableDataInsertComponent;
  let fixture: ComponentFixture<TableDataInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
