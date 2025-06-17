import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('../pages/inicio/inicio.page').then((m) => m.InicioPage),
      },
      {
        path: 'favoritos',
        loadComponent: () =>
          import('../pages/favoritos/favoritos.page').then(
            (m) => m.FavoritosPage
          ),
      },
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
    ],
  },
];
