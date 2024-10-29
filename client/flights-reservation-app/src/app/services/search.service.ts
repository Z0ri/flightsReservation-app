import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
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
  public fetchFlights(){
    return this.http.get<Flight[]>(this.apiUrl);
  }

  public getDestinations(destroy$: Subject<void>): string[]{
    let destinations: string[] = [];
    this.fetchFlights().pipe(takeUntil(destroy$))
    .subscribe((flights: Flight[])=>{
      flights.forEach(flight => {
        if(!destinations.includes(flight.arrivalLocation)){
          destinations.push(flight.arrivalLocation);
        }
      });
    });
    return destinations;
  }

  //get possible departures
  public getDepartures(destroy$: Subject<void>): string[]{
    let departures: string[] = [];
    this.fetchFlights().pipe(takeUntil(destroy$))
    .subscribe((flights: Flight[])=>{
      flights.forEach(flight => {
        if(!departures.includes(flight.departureLocation)){
          departures.push(flight.departureLocation);
        }
      });
    });
    return departures;
  }

  public get search$(): BehaviorSubject<any> {
    return this._search$;
  }
}
