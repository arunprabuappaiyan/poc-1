import { CommonModule, Location } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'poc-product-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  step = signal(0);

  locationState: any;
  productDetails: Product;

  readonly PRODUCT_DATA = PRODUCT_DATA;

  productsFG: FormGroup;

  addCount: number = 0;
  reduceCount: number = 0;

  totalProductCost: number = 0;

  constructor(private _location: Location, private _fb: FormBuilder) {
    this.locationState = this._location.getState();
    this.productDetails = this.locationState.productData;

    this.productsFG = this._fb.group({
      falcon: this.createFG(),
      modbus: this.createFG(),
      battery: this.createFG(),
      accessories: this.createFG(),
      warranty: [''],
    });
  }

  ngAfterViewInit() {
    this.productsFG.valueChanges.subscribe(() => {
      const formData = this.productsFG.getRawValue();

      this.totalProductCost =
        this.calculateProductCost(
          formData.falcon.variantCost,
          formData.falcon.nos
        ) +
        this.calculateProductCost(
          formData.modbus.variantCost,
          formData.modbus.nos
        ) +
        this.calculateProductCost(
          formData.battery.variantCost,
          formData.battery.nos
        ) +
        this.calculateProductCost(
          formData.accessories.variantCost,
          formData.accessories.nos
        );
    });
  }

  createFG(): FormGroup {
    return this._fb.group({
      variantCost: ['', Validators.required],
      nos: [
        {
          value: 0,
          disabled: true,
        },
      ],
    });
  }

  getFromGroup(fgName: string): FormGroup {
    return this.productsFG.get(fgName) as FormGroup;
  }

  add(fgName: string, fcName: string) {
    const control = this.getFromGroup(fgName).controls[fcName];
    this.addCount = control.value;

    if (control.value >= 0) {
      control.setValue(this.addCount + 1);
      control.updateValueAndValidity();
    }
  }

  reduce(fgName: string, fcName: string) {
    const control = this.getFromGroup(fgName).controls[fcName];
    this.reduceCount = control.value;

    if (control.value > 0) {
      control.setValue(this.reduceCount - 1);
      control.updateValueAndValidity();
    }
  }

  calculateProductCost(productCost: number, nos: number): number {
    return productCost * nos;
  }

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update((i) => i + 1);
  }

  prevStep() {
    this.step.update((i) => i - 1);
  }

  getQuotation() {
    const doc = new jsPDF();

    // Header - brand name and title
    autoTable(doc, {
      body: [
        [
          {
            content: 'Fuji Electric',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
          {
            content: 'Quotation',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#005cbb',
      },
    });

    // Employee details and ref num
    autoTable(doc, {
      body: [
        [
          {
            content:
              'Sales person: Ajmal jamal' +
              '\nEmployee No: 0144' +
              '\nContact number: 1234567890',
            styles: {
              halign: 'left',
            },
          },
          {
            content:
              'Reference No: #INV0001' +
              `\nDate: ${new Date().toLocaleString()}`,
            styles: {
              halign: 'right',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    // Customer address section
    autoTable(doc, {
      body: [
        [
          {
            content:
              'Billed to:' +
              '\nJohn Doe' +
              '\nBilling Address line 1' +
              '\nBilling Address line 2' +
              '\nZip code - City' +
              '\nCountry',
            styles: {
              halign: 'left',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    // Due amount section
    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: 'Amount due:',
    //         styles: {
    //           halign:'right',
    //           fontSize: 14
    //         }
    //       }
    //     ],
    //     [
    //       {
    //         content: '$4000',
    //         styles: {
    //           halign:'right',
    //           fontSize: 20,
    //           textColor: '#3366ff'
    //         }
    //       }
    //     ],
    //     [
    //       {
    //         content: 'Due date: 2022-02-01',
    //         styles: {
    //           halign:'right'
    //         }
    //       }
    //     ]
    //   ],
    //   theme: 'plain'
    // });

    // Products table heading section
    autoTable(doc, {
      body: [
        [
          {
            content: 'Products',
            styles: {
              halign: 'left',
              fontSize: 14,
            },
          },
        ],
      ],
      theme: 'plain',
    });

    // Products table data
    autoTable(doc, {
      head: [['Items', 'Category', 'Quantity', 'Price INR', 'Tax INR', 'Amount INR']],
      body: [
        [
          'Falcon X7 500KVA', 
          'UPS', 
          '1', 
          '25,45,800', 
          '20,200', 
          '25,45,800'
        ],
        [
          'Modbus RS232/RS485', 
          'UPS', 
          '1', 
          '10,000', 
          '501', 
          '10,000'
        ],
        [
          'Battery 12V  100AH Exide',
          'Battery',
          '1',
          '17,600',
          '1,700',
          '17,600',
        ],
        [
          'Battery Rack & IRIT',
          'Accessories',
          '1',
          '35,000',
          '350',
          '35,000',
        ],
        [
          'Battery Breaker with 630A',
          'Accessories',
          '2',
          '30,000',
          '3,000',
          '60,000',
        ],
        [
          'UPS to battery breaker box cable',
          'Accessories',
          '4',
          '880',
          '88',
          '3,520',
        ],
        [
          'UPS Base Frame 300mm',
          'Accessories',
          '1',
          '8,000',
          '800',
          '8,000',
        ],
        [
          'Battery base frame 300mm',
          'Accessories',
          '1',
          '7,500',
          '500',
          '7,500',
        ],
      ],
      theme: 'striped',
      headStyles: {
        fillColor: '#343a40',
      },
      styles: {
        fontSize: 8,
      }
    });

    // Total cost section
    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: 'INR 26,54,780',
            styles: {
              halign: 'right',
            },
          },
        ],
        [
          {
            content: 'Total tax:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: 'INR 27,139',
            styles: {
              halign: 'right',
            },
          },
        ],
        [
          {
            content: 'Total amount:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: 'INR 26,81,919',
            styles: {
              halign: 'right',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    // Terms section
    autoTable(doc, {
      body: [
        [
          {
            content: 'Terms & notes',
            styles: {
              halign: 'left',
              fontSize: 14,
            },
          },
        ],
        [
          {
            content:
              'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia' +
              'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum' +
              'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
            styles: {
              halign: 'left',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    // Footer section
    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: 'This is a centered footer',
    //         styles: {
    //           halign: 'center'
    //         }
    //       }
    //     ]
    //   ],
    //   theme: "plain"
    // });

    return doc.save(
      'quotation generated - ' + `${new Date().toLocaleString()}`
    );
  }
}

export const PRODUCT_DATA = {
  falcon: [
    {
      variant: 'Falcon X7 500KVA',
      cost: '2545800',
    },
    {
      variant: 'Falcon X7 400KVA',
      cost: '2000000',
    },
    {
      variant: 'Falcon X7 300KVA',
      cost: '1545800',
    },
    {
      variant: 'Falcon X7+ 80KVA',
      cost: '545800',
    },
  ],
  modbus: [
    {
      variant: 'Modbus RS232/RS485',
      cost: '10000',
    },
    {
      variant: 'Modbus RS333/RS555',
      cost: '15000',
    },
  ],
  battery: [
    {
      variant: 'Battery 12V  100AH Exide',
      cost: '17600',
    },
    {
      variant: 'Battery 12V  200AH Exide',
      cost: '21000',
    },
  ],
  accessories: [
    {
      variant: 'Battery Rack & IRIT',
      cost: '35000',
    },
    {
      variant: 'Battery Breaker with 630A',
      cost: '30000',
    },
    {
      variant: 'UPS to battery breaker box cable',
      cost: '880',
    },
    {
      variant: 'UPS Base Frame 300mm',
      cost: '8000',
    },
    {
      variant: 'Battery base frame 300mm',
      cost: '7500',
    },
  ],
  warranty: {
    1: '15000',
    2: '25000',
    3: '40000',
  },
};
