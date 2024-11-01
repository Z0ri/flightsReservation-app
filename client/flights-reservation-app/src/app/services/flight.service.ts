import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private _displayFlight$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  public get displayFlight$(): BehaviorSubject<any> {
    return this._displayFlight$;
  }
}
