import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';
import { HomeComponent } from '../components/home/home.component';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../components/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'checkout-lists',
        loadComponent: () =>
          import('../components/checkout-list/checkout-list.component').then(
            (c) => c.CheckoutListComponent
          ),
      },
      {
        path: 'product-details',
        loadComponent: () =>
          import('../components/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
