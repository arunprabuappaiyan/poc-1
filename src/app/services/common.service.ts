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
        name: 'Lithium-Ion Battery Pack',
        description: 'High-performance lithium-ion battery pack for industrial applications.',
        image: 'https://placehold.co/400',
        price: 999.99,
        category: 'Battery Packs',
        specifications: 'Capacity: 100Ah, Voltage: 48V, Dimensions: 50x40x30cm',
        productCode: 'AA-001',
      },
      {
        id: 2,
        name: 'Battery Charger',
        description: 'Fast and efficient charger for industrial batteries.',
        image: 'https://placehold.co/400',
        price: 299.99,
        category: 'Accessories',
        specifications: 'Input voltage: 220V, Output voltage: 48V, Charging time: 8 hours',
        productCode: 'BB-987',
      },
      {
        id: 3,
        name: 'Battery Management System (BMS)',
        description: 'Advanced BMS for optimal battery performance and safety.',
        image: 'https://placehold.co/400',
        price: 499.99,
        category: 'Accessories',
        specifications: 'Cell balancing, temperature monitoring, overcharge/discharge protection',
        productCode: 'CD-456',
      },
      {
        id: 4,
        name: 'Pure Sine Wave Inverter',
        description: 'Converts DC power to AC power for various appliances.',
        image: 'https://placehold.co/400',
        price: 1499.99,
        category: 'Inverter',
        specifications: 'Output power: 3000W, Input voltage: 12V, Output voltage: 220V',
        productCode: 'KJ-345',
      },
      {
        id: 5,
        name: 'Battery Stand',
        description: 'Secure and stable stand for your batteries.',
        image: 'https://placehold.co/400',
        price: 99.99,
        category: 'Accessories',
        specifications: 'Load capacity: 100kg, Dimensions: 50x40x20cm',
        productCode: 'XZ-66',
      },
      {
        id: 6,
        name: 'Wiring Kit',
        description: 'Complete wiring kit for connecting your system.',
        image: 'https://placehold.co/400',
        price: 199.99,
        category: 'Accessories',
        specifications: 'Includes cables, connectors, and terminals',
        productCode: 'TR-77700',
      },
    ]
  }
}
