import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaySelectComponent } from './replay-select.component';

describe('ReplaySelectComponent', () => {
  let component: ReplaySelectComponent;
  let fixture: ComponentFixture<ReplaySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplaySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
