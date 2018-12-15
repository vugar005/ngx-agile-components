import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeTableComponent } from './native-table.component';

describe('NativeTableComponent', () => {
  let component: NativeTableComponent;
  let fixture: ComponentFixture<NativeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NativeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NativeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
