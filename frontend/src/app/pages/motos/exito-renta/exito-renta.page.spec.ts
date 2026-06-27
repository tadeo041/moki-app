import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExitoRentaPage } from './exito-renta.page';

describe('ExitoRentaPage', () => {
  let component: ExitoRentaPage;
  let fixture: ComponentFixture<ExitoRentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitoRentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
