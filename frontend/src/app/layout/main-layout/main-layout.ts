import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    template: `
        <div class="flex flex-col h-screen bg-gray-50">
            <main class="flex-1 overflow-y-auto pb-[70px]">
                <router-outlet></router-outlet>
            </main>

            <nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-200 h-[70px] z-50 shadow-sm">
                <!-- Inicio -->
                <a class="nav-item flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200 hover:text-gray-800"
                   routerLink="/inicio" 
                   routerLinkActive="active"
                   [routerLinkActiveOptions]="{ exact: true }">
                    <i class="nav-icon fi fi-rr-home text-2xl transition-all duration-200"></i>
                    <span class="nav-label text-xs font-medium transition-colors duration-200">Inicio</span>
                </a>

                <!-- Mis Rentas -->
                <a class="nav-item flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200 hover:text-gray-800"
                   routerLink="/mis-rentas/lista-ordenes" 
                   routerLinkActive="active">
                    <i class="nav-icon fi fi-rr-calendar-lines text-2xl transition-all duration-200"></i>
                    <span class="nav-label text-xs font-medium transition-colors duration-200">Mis Rentas</span>
                </a>

                <!-- Perfil -->
                <a class="nav-item flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200 hover:text-gray-800"
                   routerLink="/perfil/perfil" 
                   routerLinkActive="active">
                    <i class="nav-icon fi fi-rr-user text-2xl transition-all duration-200"></i>
                    <span class="nav-label text-xs font-medium transition-colors duration-200">Perfil</span>
                </a>
            </nav>
        </div>
    `,
    styles: [`
        /* Estilos base */
        .nav-item {
            position: relative;
            color: #9ca3af;
            cursor: pointer;
            text-decoration: none;
        }

        .nav-item .nav-icon {
            color: #9ca3af;
            transform: scale(1);
            transition: all 0.2s ease;
        }

        .nav-item .nav-label {
            color: #9ca3af;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        /* Estado activo - usando especificidad */
        .nav-item.active .nav-icon {
            color: #1a202c;
            transform: scale(1.1);
        }

        .nav-item.active .nav-label {
            color: #1a202c;
            font-weight: 600;
        }

        /* Indicador activo (barra superior) */
        .nav-item::after {
            content: '';
            position: absolute;
            top: -1px;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 24px;
            height: 3px;
            background: #1a202c;
            border-radius: 0 0 3px 3px;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item.active::after {
            transform: translateX(-50%) scaleX(1);
        }

        /* Efecto hover */
        .nav-item:hover .nav-icon {
            color: #4a5568;
            transform: scale(1.05);
        }

        .nav-item:hover .nav-label {
            color: #4a5568;
        }

        /* Animación de entrada */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .nav-item {
            animation: fadeInUp 0.3s ease forwards;
            opacity: 0;
        }

        .nav-item:nth-child(1) { animation-delay: 0.05s; }
        .nav-item:nth-child(2) { animation-delay: 0.1s; }
        .nav-item:nth-child(3) { animation-delay: 0.15s; }

        /* Responsive */
        @media (max-width: 480px) {
            nav {
                height: 60px;
            }
            
            .nav-icon {
                font-size: 1.25rem;
            }
            
            .nav-label {
                font-size: 10px;
            }
            
            .pb-\\[70px\\] {
                padding-bottom: 60px;
            }
        }
    `]
})
export class MainLayout {
    constructor() {}
}