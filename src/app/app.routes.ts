import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'details/:id', component: Details },
  { path: 'about', component: About }
];
