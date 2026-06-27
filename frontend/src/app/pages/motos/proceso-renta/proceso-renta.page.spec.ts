import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcesoRentaPage } from './proceso-renta.page';

describe('ProcesoRentaPage', () => {
  let component: ProcesoRentaPage;
  let fixture: ComponentFixture<ProcesoRentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoRentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
