import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'product-details',
        loadComponent: () =>
          import(
            './product-details/product-details.component'
          ).then((c) => c.ProductDetailsComponent),
      },
    ],
  },
];
