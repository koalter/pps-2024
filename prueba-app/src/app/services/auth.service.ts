import { Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = user(this.auth);
  currentUserSignal = signal<any>(undefined);

  constructor(private auth: Auth) { }

  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {}));
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}
