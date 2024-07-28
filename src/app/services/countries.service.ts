import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private apiUrl = 'https://your-api-endpoint.com/api/countries'; 

    constructor(private http: HttpClient) { }

    getSelectedCountries(): Observable<string[]> {
        return of(['asda', 'ásdad'])
    }

    addSelectedCountry(countryCode: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/selected`, { countryCode });
    }

    removeSelectedCountry(countryCode: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/selected/${countryCode}`);
    }
}
