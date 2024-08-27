import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonService } from '../../services/common.service';

interface SideNav {
  name: string;
  isDisabled: boolean;
  routerLink: string;
}

@Component({
  selector: 'poc-side-menu',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  sideNavItems: SideNav[] = [];

  constructor(public service: CommonService) {
    this.sideNavItems = [
      {
        name: 'Dashboard',
        routerLink: 'dashboard',
        isDisabled: false,
      },
      {
        name: 'Products',
        routerLink: 'products',
        isDisabled: false,
      },
      {
        name: 'Employees',
        routerLink: 'employees',
        isDisabled: true,
      },
    ]
  }
}
