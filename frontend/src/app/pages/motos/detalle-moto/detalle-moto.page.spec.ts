import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMotoPage } from './detalle-moto.page';

describe('DetalleMotoPage', () => {
  let component: DetalleMotoPage;
  let fixture: ComponentFixture<DetalleMotoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
