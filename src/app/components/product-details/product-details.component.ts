import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'poc-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  locationState: any;
  productDetails: Product;

  constructor(
    private _location: Location
  ) {
    this.locationState = this._location.getState();
    this.productDetails = this.locationState.productData;
  }

}
