
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'login',
        loadComponent:()=>import('./login/login.component')
    },
    {
        
        path:'',
        loadComponent:()=>import('./shered/components/layout/layout.component'),
        children:[
            
            {
                path:'dashboard',
                loadComponent:()=>import('./business/dashboard/dashboard.component')
            },
            {
                path:'profile',
                loadComponent:()=>import('./business/profile/profile.component')
            },
            {
                path:'tables',
                loadComponent:()=>import('./business/tables/tables.component')
            },
        ]
    },
    {
        path:'**',
        redirectTo:'dashboard'
    }
];
