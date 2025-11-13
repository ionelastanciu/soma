import { Routes } from '@angular/router';
import { HomePage } from './features/home/home-page/home-page';
import { CheckInPage} from './features/check-in/check-in-page/check-in-page';
import { ReadingsPage } from './features/readings/readings-page/readings-page';

export const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'check-in', component: CheckInPage },
   { path: 'readings', component: ReadingsPage },


  { path: 'readings', component: HomePage },
  { path: 'journal', component: HomePage },
  { path: 'about', component: HomePage },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
