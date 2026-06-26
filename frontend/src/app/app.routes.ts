import { Routes } from '@angular/router';
// Importaciones de layouts
import { MainLayout } from './layout/main-layout/main-layout'; 
import { AuthLayout } from './layout/auth-layout/auth-layout';

// inicio de sesión 
import { PagueInicioSesionComponent } from './auth/inicio-sesion/inicio-sesion.component';
import { PagueCrearCuentaComponent } from './auth/crear-cuenta/crear-cuenta.component';

// Contendio de la aplicacion 
import { TabInicioComponent } from './pages/navbar/tab-inicio/tab-inicio.component';
import { TabMisRentasComponent } from './pages/navbar/tab-mis-rentas/tab-mis-rentas.component';
import { TabPerfilComponent } from './pages/navbar/tab-perfil/tab-perfil.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: 'inicio-sesion', component: PagueInicioSesionComponent },
            { path: 'crear-cuenta', component: PagueCrearCuentaComponent },
            { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'inicio', component: TabInicioComponent
            },
            {
                path: 'mis-rentas',
                children: [
                    { path: 'lista-ordenes', component: TabMisRentasComponent },
                ]
            },
            {
                path: 'perfil',
                children: [
                    { path: 'perfil', component:  TabPerfilComponent},
                ]
            },            
        ]
    },
    
    { path: '**', redirectTo: '/inicio-sesion' }
];
