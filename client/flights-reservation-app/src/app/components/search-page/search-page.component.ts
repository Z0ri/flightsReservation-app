import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { filter, skip, Subject, takeUntil } from 'rxjs';
import { Flight } from '../../models/Flight';
import { SearchService } from '../../services/search.service';
import { NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FlightCardComponent } from "../../models/flight-card/flight-card.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    FlightCardComponent
],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit, AfterViewInit, OnDestroy{
  flights: Flight[] = [];
  flightFound: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private router: Router,
    private cookieService: CookieService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(()=>{
      this.cookieService.delete("searchParameters");
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  


  ngAfterViewInit(): void {
    if(this.cookieService.get("searchParameters")){
      const searchParameters = JSON.parse(this.cookieService.get("searchParameters"));
      console.log("search parameters in ngAfterViewInit: ", searchParameters);
      console.log("arrival location: ", searchParameters.arrivalLocation);
      
      this.searchService.fetchFlights().pipe(takeUntil(this.destroy$))
      .subscribe((flights: Flight[]) => {
        flights.forEach(flight => {
          if(flight.arrivalLocation ==  searchParameters.arrivalLocation && 
            flight.departureLocation == searchParameters.departureLocation
          ){
            this.flightFound = true;
            this.flights.push(flight);
            this.cd.detectChanges();
          }
        });
      });
    }else{
      this.searchService.search$.pipe(takeUntil(this.destroy$))
      .subscribe((searchParameters: any)=>{
        this.cookieService.set("searchParameters", JSON.stringify(searchParameters));
        this.searchService.fetchFlights().pipe(takeUntil(this.destroy$))
        .subscribe((flights: Flight[]) => {
          flights.forEach(flight => {
            if(flight.arrivalLocation ==  searchParameters.arrivalLocation && 
              flight.departureLocation == searchParameters.departureLocation
            ){
              console.log("Flight pushato: ", flight);
              this.flightFound = true;
              this.cd.detectChanges();
              this.flights.push(flight);
              console.log("Flight pushato.");
            }
          });
        });
      });
    }


  }

  
}
