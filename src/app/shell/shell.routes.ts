import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../components/dashboard/home.router').then(
            (r) => r.HOME_ROUTES
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../components/products/products.route').then(
            (r) => r.PRODUCTS_ROUTES
          ),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('../components/employees/employees.route').then(
            (r) => r.EMPLOYEES_ROUTES
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
