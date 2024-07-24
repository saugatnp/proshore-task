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
        path: 'products',
        loadComponent: () =>
            import('../app/components/home/home.component').then(
                (m) => m.HomeComponent
            ),
    },
    {
        path: 'products/:id',
        loadComponent: () =>
            import('../app/components/details/details.component').then(
                (m) => m.DetailsComponent
            ),
    },
    {
        path: 'products/:id/edit',
        loadComponent: () =>
            import('../app/components/edit/edit.component').then(
                (m) => m.EditComponent
            ),
    },
    {
        path: 'product/add',
        loadComponent: () =>
            import('../app/components/add/add.component').then(
                (m) => m.AddComponent
            ),
    },
];
