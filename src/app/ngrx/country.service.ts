import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    private baseUrl = 'http://localhost:5000/api';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(String(localStorage.getItem('currentUser'))));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public addCountry(country: string): Observable<any> {
        const token = this.currentUserValue?.token;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.post(`${this.baseUrl}/user/addCountry`, { country }, { headers });
    }

    public getCountries(): Observable<any> {
        const token = this.currentUserValue?.token;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        return this.http.get(`${this.baseUrl}/user/countries`, { headers });
    }
}
