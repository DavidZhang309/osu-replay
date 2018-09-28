import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayPlayerComponent } from './replay-player.component';

describe('ReplayPlayerComponent', () => {
  let component: ReplayPlayerComponent;
  let fixture: ComponentFixture<ReplayPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
