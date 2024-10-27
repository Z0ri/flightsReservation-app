import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl: string = "http://localhost:3000/api/flights";
  private _search$: BehaviorSubject<any> = new BehaviorSubject({});


  constructor(
    private http: HttpClient
  ) { }

  //fetch flights api
  fetchFlights(){
    return this.http.get<Flight[]>(this.apiUrl);
  }

  public get search$(): BehaviorSubject<any> {
    return this._search$;
  }
}
