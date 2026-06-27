import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenCompraPage } from './resumen-compra.page';

describe('ResumenCompraPage', () => {
  let component: ResumenCompraPage;
  let fixture: ComponentFixture<ResumenCompraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
