import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { filter, Subject, takeUntil } from 'rxjs';
import { Flight } from '../../models/Flight';
import { SearchService } from '../../services/search.service';
import { NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FlightCardComponent } from "../../models/flight-card/flight-card.component";
import { SessionStorageService } from '../../services/session-storage.service';
import { parse } from 'path';

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
  styleUrls: ['./search-page.component.css' // corrected from 'styleUrl' to 'styleUrls'
  ]
})
export class SearchPageComponent implements OnInit, AfterViewInit, OnDestroy {
  flights: Flight[] = [];
  flightFound: boolean = false;
  displayedParameters: string = "";
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    const searchParameters = this.sessionStorageService.getItem("searchParameters");

    if (searchParameters) {
      const parsedParameters = JSON.parse(searchParameters);

      //display search query
      const departureDate = new Date(parsedParameters.departureDate);// Parse the departureDate into a Date object
      const day = String(departureDate.getDate()).padStart(2, '0');
      const month = String(departureDate.getMonth() + 1).padStart(2, '0'); 
      const year = String(departureDate.getFullYear()).slice(-2); 
      this.displayedParameters = 
      `from ${parsedParameters.departureLocation} to ${parsedParameters.arrivalLocation}
      - Departure: ${`${day}/${month}/${year}`} ${parsedParameters.departureTime}`;
      this.cd.detectChanges(); 

      this.searchService.fetchFlights().pipe(takeUntil(this.destroy$))
        .subscribe((flights: Flight[]) => {
          flights.forEach(flight => {
            // Create a Date object for the flight's departure time
            let departureDate = new Date(flight.departureTime);
            // Create a Date object for the search parameters' departure time
            let searchDate = new Date(parsedParameters.departureDate);
            const [searchHours, searchMinutes] = parsedParameters.departureTime.split(':').map(Number);
            
            // Set the hours and minutes for searchDate based on the search time
            searchDate.setHours(searchHours, searchMinutes);
  
            // Check if the flight matches the search criteria
            if (flight.arrivalLocation === parsedParameters.arrivalLocation &&
                flight.departureLocation === parsedParameters.departureLocation &&
                departureDate >= searchDate) {
              this.flightFound = true;
              this.flights.push(flight);
              this.cd.detectChanges();
            }
          });
        });
    } else {
      this.searchService.search$.pipe(takeUntil(this.destroy$))
        .subscribe((searchParameters: any) => {
          //display search query
          const departureDate = new Date(searchParameters.departureDate);// Parse the departureDate into a Date object
          const day = String(departureDate.getDate()).padStart(2, '0');
          const month = String(departureDate.getMonth() + 1).padStart(2, '0'); 
          const year = String(departureDate.getFullYear()).slice(-2); 
          this.displayedParameters = 
          `from ${searchParameters.departureLocation} to ${searchParameters.arrivalLocation}
          - Departure: ${`${day}/${month}/${year}`} ${searchParameters.departureTime}`;
          this.cd.detectChanges(); 

          this.searchService.fetchFlights().pipe(takeUntil(this.destroy$))
            .subscribe((flights: Flight[]) => {
              flights.forEach(flight => {
                // Create a Date object for the flight's departure time
                let departureDate = new Date(flight.departureTime);
  
                // Create a Date object for the search parameters' departure time
                let searchDate = new Date(searchParameters.departureDate);
                const [searchHours, searchMinutes] = searchParameters.departureTime.split(':').map(Number);
                
                // Set the hours and minutes for searchDate based on the search time
                searchDate.setHours(searchHours, searchMinutes);
  
                // Check if the flight matches the search criteria
                if (flight.arrivalLocation === searchParameters.arrivalLocation &&
                    flight.departureLocation === searchParameters.departureLocation &&
                    departureDate >= searchDate) {                     
                  this.flightFound = true;
                  this.flights.push(flight);
                  this.cd.detectChanges();
                }
              });
            });
        });
    }
  }
  
}
