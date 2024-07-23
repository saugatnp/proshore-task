import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('../app/components/home/home.component').then(
                (m) => m.HomeComponent
            ),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('../app/components/home/home.component').then(
                (m) => m.HomeComponent
            ),
    },
];
