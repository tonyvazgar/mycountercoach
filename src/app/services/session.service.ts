import { Injectable } from '@angular/core';
import { SessionTemplate } from '../models/session.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private session: SessionTemplate | null = null;

  setSession(template: SessionTemplate) {
    this.session = template;
  }

  getSession(): SessionTemplate | null {
    return this.session;
  }
}
