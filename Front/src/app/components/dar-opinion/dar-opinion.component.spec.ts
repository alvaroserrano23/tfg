import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarOpinionComponent } from './dar-opinion.component';

describe('DarOpinionComponent', () => {
  let component: DarOpinionComponent;
  let fixture: ComponentFixture<DarOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarOpinionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
