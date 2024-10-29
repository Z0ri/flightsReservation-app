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
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        sessionStorage.removeItem("searchParameters");
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    const searchParameters = sessionStorage.getItem("searchParameters");
    if (searchParameters) {
      const parsedParameters = JSON.parse(searchParameters);
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
              
              console.log("flight Departure Date: ", departureDate);
              console.log("parameters Search Date: ", searchDate);
              console.log("date comparison: ", departureDate >= searchDate);
              this.flightFound = true;
              this.flights.push(flight);
              this.cd.detectChanges();
            }
          });
        });
    } else {
      this.searchService.search$.pipe(takeUntil(this.destroy$))
        .subscribe((searchParameters: any) => {
          sessionStorage.setItem("searchParameters", JSON.stringify(searchParameters)); // Store search parameters in sessionStorage
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
  
                  console.log("Flight Departure Date: ", departureDate.toISOString()); // Log in ISO format for clarity
                  console.log("Search Date: ", searchDate.toISOString()); // Log in ISO format for clarity
                  console.log("Date Comparison: ", departureDate >= searchDate);                      
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
