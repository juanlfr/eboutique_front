import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {


  constructor(private httpClient: HttpClient) { }

  getCountries() : Observable<string[]> {
    //const countriesUrl = "http://localhost:8080/api/v1/externalApi/countries" 
    return this.httpClient.get<string[]>(environment.countriesUrl);
  }

  getYearsForCreditCardExpirationDate(): Observable<number[]>{

    const currentYear = new Date().getFullYear();

    const endYear = currentYear + 10;
    
    let years: number[] = []; 

    for(let i = currentYear; i <= endYear; i++){
      years.push(i);
    }
    return of(years);
  }
}
