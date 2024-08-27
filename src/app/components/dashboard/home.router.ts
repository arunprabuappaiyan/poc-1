import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      // {
      //   path: 'product-details',
      //   loadComponent: () =>
      //     import(
      //       '../../product-details/product-details.component'
      //     ).then((c) => c.ProductDetailsComponent),
      // },
    ],
  },
];
