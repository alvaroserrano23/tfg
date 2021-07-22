import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModificarComponent } from './admin-modificar.component';

describe('AdminModificarComponent', () => {
  let component: AdminModificarComponent;
  let fixture: ComponentFixture<AdminModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
