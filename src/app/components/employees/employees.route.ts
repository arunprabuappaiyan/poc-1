import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmployeesComponent,
      },
    //   {
    //     path: 'product-details',
    //     loadComponent: () =>
    //       import(
    //         './product-details/product-details.component'
    //       ).then((c) => c.ProductDetailsComponent),
    //   },
    ],
  },
];
