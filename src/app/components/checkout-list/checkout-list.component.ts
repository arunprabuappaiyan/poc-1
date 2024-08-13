import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'poc-checkout-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './checkout-list.component.html',
  styleUrl: './checkout-list.component.scss'
})
export class CheckoutListComponent {

  productLists: Product[] = [];

  constructor(public service: CommonService, private _snackBar: MatSnackBar) {
    this.productLists = this.service.checkoutListsSig();
  }

  removeListItem(productId: number): void {

    const index = this.productLists.findIndex(p => p.id === productId);
    if (index !== -1) {
      this.productLists.splice(index, 1);
    }

    console.log(this.productLists);
    
  }

}
