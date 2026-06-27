import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpcionesInicioComponent } from './opciones-inicio.component';

describe('OpcionesInicioComponent', () => {
  let component: OpcionesInicioComponent;
  let fixture: ComponentFixture<OpcionesInicioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OpcionesInicioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpcionesInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
