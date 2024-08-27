import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonService } from '../../../services/common.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'poc-products',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatBadgeModule,
    RouterOutlet,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  searchTerm: string = '';
  filteredProducts: Product[] = [];

  constructor(
    public service: CommonService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.filteredProducts = service.products;
  }

  ngOnInit(): void {}

  onSearch(): void {
    this.filteredProducts = this.service.products.filter((product) => {
      const searchTerms = this.searchTerm.toLowerCase().split(' ');
      return searchTerms.some((term) => {
        return (
          product.description.toLowerCase().includes(term) ||
          product.itemGroup.toLowerCase().includes(term) ||
          product.productCode.toLowerCase().includes(term)
        );
      });
    });
  }

  addToListSig(product: Product): void {
    this.service.checkoutListsSig().push(product);
    this._snackBar.open('Product added to Purchase lists', 'close', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start',
    });
  }

  productDetailsPage(product: Product): void {
    this._router.navigateByUrl('shell/products/product-details', {
      state: { productData: product },
    });
  }
}
