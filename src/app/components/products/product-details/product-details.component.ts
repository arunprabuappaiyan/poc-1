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
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    CommonModule
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

      this.totalProductCost = (
        this.calculateProductCost(formData.falcon.variantCost, formData.falcon.nos) +
        this.calculateProductCost(formData.modbus.variantCost, formData.modbus.nos) +
        this.calculateProductCost(formData.battery.variantCost, formData.battery.nos) +
        this.calculateProductCost(formData.accessories.variantCost, formData.accessories.nos)
      )
    });
  }

  createFG(): FormGroup {
    return this._fb.group({
      variantCost: ['', Validators.required],
      nos: [
        {
          value: 0,
          disabled: true,
        }
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
