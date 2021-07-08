import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHistorialComponent } from './detail-historial.component';

describe('DetailHistorialComponent', () => {
  let component: DetailHistorialComponent;
  let fixture: ComponentFixture<DetailHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
