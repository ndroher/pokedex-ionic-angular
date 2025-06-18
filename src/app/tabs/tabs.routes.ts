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
        path: 'detalhes/:id',
        loadComponent: () =>
          import('../pages/detalhes/detalhes.page').then((m) => m.DetalhesPage),
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
