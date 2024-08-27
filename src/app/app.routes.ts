import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'shell',
        loadChildren: () => import('./shell/shell.routes').then((r) => r.SHELL_ROUTES),
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];
