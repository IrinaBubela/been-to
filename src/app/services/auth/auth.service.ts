import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(String(localStorage.getItem('currentUser'))));
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  public signup(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/signup`, { email, password });
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public getUserIdFromToken(): string | null {
    const token = this.currentUserValue?.token;
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.userId;
    }
    return null;
  }
}
