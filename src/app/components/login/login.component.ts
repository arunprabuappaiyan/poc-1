import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'poc-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginFormGroup!: FormGroup;

  constructor(private _fb: FormBuilder, private _router: Router) {
    this.loginFormGroup = this._fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['', [Validators.required]],
    });
  }

  hasError(control: string, errorName: string): boolean {
    return this.loginFormGroup.controls[control].hasError(errorName);
  }

  login(): void {
    this._router.navigate(["shell/home"]);
  }

}
