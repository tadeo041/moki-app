import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'splash',
    loadComponent: () => import('./auth/splash/splash.component').then(m => m.SplashComponent)
  },
  {
    path: 'opciones-sesion',
    loadComponent: () => import('./auth/opciones-inicio/opciones-inicio.component').then(m => m.OpcionesInicioComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/inicio-sesion/inicio-sesion.component').then(m => m.InicioSesionComponent)
  },
  {
    path: 'crear-cuenta',
    loadComponent: () => import('./auth/crear-cuenta/crear-cuenta.component').then(m => m.CrearCuentaComponent)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./pages/navbar/tab-inicio/tab-inicio.component').then(m => m.TabInicioComponent)
      },
      {
        path: 'mis-rentas',
        loadComponent: () => import('./pages/navbar/tab-mis-rentas/tab-mis-rentas.component').then(m => m.TabMisRentasComponent),
        canActivate: [authGuard]
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/navbar/tab-perfil/tab-perfil.component').then(m => m.TabPerfilComponent),
        canActivate: [authGuard]
      },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },
  {
    path: 'buscador-motos',
    loadComponent: () => import('./pages/motos/buscador-motos/buscador-motos.page').then(m => m.BuscadorMotosPage)
  },
  {
    path: 'mis-rentas/detalle/:id',
    loadComponent: () => import('./pages/motos/detalle-moto-owner/detalle-moto-owner.page').then(m => m.DetalleMotoOwnerPage),
    canActivate: [authGuard]
  },
  {
    path: 'detalle-moto/:id',
    loadComponent: () => import('./pages/motos/detalle-moto/detalle-moto.page').then(m => m.DetalleMotoPage)
  },
  {
    path: 'proceso-renta/:id',
    loadComponent: () => import('./pages/motos/proceso-renta/proceso-renta.page').then(m => m.ProcesoRentaPage),
    canActivate: [authGuard]
  },
  {
    path: 'resumen-compra',
    loadComponent: () => import('./pages/motos/resumen-compra/resumen-compra.page').then(m => m.ResumenCompraPage),
    canActivate: [authGuard]
  },
  {
    path: 'exito-renta',
    loadComponent: () => import('./pages/motos/exito-renta/exito-renta.page').then(m => m.ExitoRentaPage),
    canActivate: [authGuard]
  },

  {
  path: 'publicar-moto',
  loadComponent: () => import('./pages/motos/publicar-moto/publicar-moto.page').then(m => m.PublicarMotoPage),
  canActivate: [authGuard]
},
];