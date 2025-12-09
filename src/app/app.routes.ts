import { Routes } from '@angular/router';

import { HomePage } from './components/home/home-page/home-page';
import { CheckInPage } from './components/check-in/check-in-page/check-in-page';
import { ReadingsPage } from './components/readings/readings-page/readings-page';
import { JournalPage } from './components/journal/journal-page/journal-page';
import { AboutPage } from './components/about/about-page/about-page';
import { NotFoundPage } from './components/not-found/not-found-page/not-found-page';

export const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'check-in', component: CheckInPage },
  { path: 'readings', component: ReadingsPage },
  { path: 'journal', component: JournalPage },
  { path: 'about', component: AboutPage },


  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];
