import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CreateSessionComponent } from './pages/create-session/create-session.component';
import { JoinSessionComponent } from './pages/join-session/join-session.component';
import { SessionComponent } from './pages/session/session.component';
import { AthleteComponent } from './pages/athlete/athlete.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateSessionComponent },
  { path: 'join', component: AthleteComponent },
  { path: 'session/:id', component: SessionComponent },
  { path: '**', redirectTo: '' }
];
