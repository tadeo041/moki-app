import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

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
  // TABS para usuario normal
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    canActivate: [authGuard],
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./pages/navbar/tab-inicio/tab-inicio.component').then(m => m.TabInicioComponent)
      },
      {
        path: 'mis-rentas',
        loadComponent: () => import('./pages/navbar/tab-mis-rentas/tab-mis-rentas.component').then(m => m.TabMisRentasComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/navbar/tab-perfil/tab-perfil.component').then(m => m.TabPerfilComponent)
      },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },
  // TABS para ADMIN
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin-tabs/admin-tabs.page').then(m => m.AdminTabsPage),
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: 'motorcycles',
        loadComponent: () => import('./pages/admin/motorcycles/motorcycles.page').then(m => m.AdminMotorcyclesPage)
      },
      {
        path: 'motorcycles/create',
        loadComponent: () => import('./pages/admin/motorcycles/create-motorcycle/create-motorcycle.page').then(m => m.CreateMotorcyclePage)
      },
      {
        path: 'motorcycles/:id',
        loadComponent: () => import('./pages/admin/motorcycles/motorcycle-detail/motorcycle-detail.page').then(m => m.MotorcycleDetailPage)
      },
      {
        path: 'sos',
        loadComponent: () => import('./pages/admin/sos/sos.page').then(m => m.AdminSosPage)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/admin/perfil/perfil.page').then(m => m.AdminPerfilPage)
      },      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // Rutas públicas (usuario normal)
  {
    path: 'buscador-motos',
    loadComponent: () => import('./pages/motos/buscador-motos/buscador-motos.page').then(m => m.BuscadorMotosPage)
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
    path: 'mis-rentas/detalle/:id',
    loadComponent: () => import('./pages/motos/detalle-moto-owner/detalle-moto-owner.page').then(m => m.DetalleMotoOwnerPage),
    canActivate: [authGuard]
  },
  // SOS - Botón de pánico
  {
    path: 'sos/activar',
    loadComponent: () => import('./pages/sos/activar-sos/activar-sos.page').then(m => m.ActivarSosPage),
    canActivate: [authGuard]
  },
  {
    path: 'sos/mis-alertas',
    loadComponent: () => import('./pages/sos/mis-alertas/mis-alertas.page').then(m => m.MisAlertasPage),
    canActivate: [authGuard]
  },
  {
    path: 'sos/detalle/:id',
    loadComponent: () => import('./pages/sos/detalle-sos/detalle-sos.page').then(m => m.DetalleSosPage),
    canActivate: [authGuard]
  }
];