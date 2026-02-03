import { Injectable } from '@angular/core';
import { SessionTemplate } from '../models/session.model';

const SESSION_KEY = 'mycountercoach_session';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private session: SessionTemplate | null = null;

  setSession(template: SessionTemplate) {
    this.session = template;
    localStorage.setItem(SESSION_KEY, JSON.stringify(template));
  }

  getSession(): SessionTemplate | null {
    if (this.session) return this.session;

    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    this.session = JSON.parse(raw);
    return this.session;
  }

  clearSession() {
    this.session = null;
    localStorage.removeItem(SESSION_KEY);
  }
}
