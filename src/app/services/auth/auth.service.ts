import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>('/api/login', { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response.token));
            this.loggedInSubject.next(true);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedInSubject.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}
