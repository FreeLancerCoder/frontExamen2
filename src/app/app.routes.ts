import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guards';
import { roleGuard } from './guards/role.guards';
import { loginGuard } from './guards/login.guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./shared/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./business/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
      {
        path: 'carreras',
        loadComponent: () => import('./business/carreras/carreras.component').then(m => m.CarrerasComponent),
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
      {
        path: 'facultades',
        loadComponent: () => import('./business/faculties/faculties.component').then(m => m.FacultiesComponent),
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
      {
        path: 'materias',
        loadComponent: () => import('./business/materias/materias.component').then(m => m.MateriasComponent),
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
      {
        path: 'aulas',
        loadComponent: () => import('./business/aulas/aulas.component').then(m => m.AulasComponent),
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./shared/components/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
