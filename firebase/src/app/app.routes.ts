import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'create-post',
    loadComponent: () => import('./pages/create-post/create-post.page').then( m => m.CreatePostPage)
  },
  {
    path: 'get-all-post',
    loadComponent: () => import('./pages/get-all-post/get-all-post.page').then( m => m.GetAllPostPage)
  },

];
