import { Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('login') }
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo('home') }
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
];
