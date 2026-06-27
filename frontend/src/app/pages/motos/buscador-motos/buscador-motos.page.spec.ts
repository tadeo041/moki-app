import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorMotosPage } from './buscador-motos.page';

describe('BuscadorMotosPage', () => {
  let component: BuscadorMotosPage;
  let fixture: ComponentFixture<BuscadorMotosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
