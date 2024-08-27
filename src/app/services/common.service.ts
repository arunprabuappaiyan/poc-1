import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  checkoutListsSig = signal<Product[]>([]);

  products: Product[] = [];
  constructor() {
    this.products = [
      {
        id: 1,
        productCode: 'FML33X0200FALB2257',
        description: 'Falcon X7 200 kVA/180 kW',
        itemGroup: 'UPS',
        rmc: '2,545,800',
        image: 'https://www.india.fujielectric.com/hubfs/frenic-mini-c2.jpg',
      },
      {
        id: 2,
        productCode: 'Modbus',
        description: 'Modbus RS232/RS485',
        itemGroup: 'UPS',
        rmc: '10,000',
        image: 'https://www.india.fujielectric.com/hubfs/frenic-mini-c2.jpg',
      },
      {
        id: 3,
        productCode: 'Batt100AHSMFEX',
        description: 'Battery 12V  200AH Exide',
        itemGroup: 'Battery',
        rmc: '17,600',
        image: 'https://www.india.fujielectric.com/hubfs/frenic-mini-c2.jpg',
      },
      {
        id: 4,
        productCode: 'HBTRXX0026SMF033',
        description: 'Battery Rack & IRIT',
        itemGroup: 'Accessories',
        rmc: '35,000',
        image: 'https://www.india.fujielectric.com/hubfs/frenic-mini-c2.jpg',
      },
      {
        id: 5,
        productCode: 'RPOM00205',
        description: 'Battery Breaker with 630A ',
        itemGroup: 'Accessories',
        rmc: '30,000',
        image: 'https://www.india.fujielectric.com/hubfs/frenic-mini-c2.jpg',
      },
      {
        id: 6,
        productCode: 'RCBL00334',
        description: 'UPS to battery brekaer box cable',
        itemGroup: 'Accessories',
        rmc: '850',
        image: 'https://www.india.fujielectric.com/hubfs/frenic-mini-c2.jpg',
      },
      {
        id: 7,
        productCode: 'BFUPS300mmstd',
        description: 'UPS Base Frame 300mm',
        itemGroup: 'Accessories',
        rmc: '8,000',
        image: 'https://www.india.fujielectric.com/hubfs/frenic-mini-c2.jpg',
      },
      {
        id: 8,
        productCode: 'BFBAT300mmstd',
        description: 'Battery base frame 300mm',
        itemGroup: 'Accessories',
        rmc: '7,500',
        image: 'https://www.india.fujielectric.com/hubfs/frenic-mini-c2.jpg',
      },
    ]
  }
}
