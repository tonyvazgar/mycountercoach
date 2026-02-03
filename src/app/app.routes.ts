import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CreateSessionComponent } from './pages/create-session/create-session.component';
import { JoinSessionComponent } from './pages/join-session/join-session.component';
import { SessionComponent } from './pages/session/session.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateSessionComponent },
  { path: 'join', component: JoinSessionComponent },
  { path: 'session/:id', component: SessionComponent },
  { path: '**', redirectTo: '' }
];
