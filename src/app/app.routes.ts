import { Routes } from '@angular/router';

import { HomePage } from './features/home/home-page/home-page';
import { CheckInPage } from './features/check-in/check-in-page/check-in-page';
import { ReadingsPage } from './features/readings/readings-page/readings-page';
import { JournalPage } from './features/journal/journal-page/journal-page';
import { AboutPage } from './features/about/about-page/about-page';
import { NotFoundPage } from './features/not-found/not-found-page/not-found-page';

export const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'check-in', component: CheckInPage },
  { path: 'readings', component: ReadingsPage },
  { path: 'journal', component: JournalPage },
  { path: 'about', component: AboutPage },


  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];
