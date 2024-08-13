import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonService } from '../../services/common.service';
import { Product } from '../../models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';

@Component({
  selector: 'poc-home',
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
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

  viewList(): void {
    this._router.navigate(['shell/checkout-lists']);
  }

  productDetailsPage(product: Product): void {
    this._router.navigateByUrl('shell/product-details', {
      state: { productData: product }
    })
  }
}
