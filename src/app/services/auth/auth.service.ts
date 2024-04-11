import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}
