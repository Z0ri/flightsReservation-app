import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FlightService } from '../../services/flight.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../services/session-storage.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flight-page',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    GoogleMapsModule,
    MatButtonModule
  ],
  templateUrl: './flight-page.component.html',
  styleUrl: './flight-page.component.css'
})
export class FlightPageComponent implements AfterViewInit, OnDestroy{
  private destroy$: Subject<void> = new Subject<void>;
  flightData!: any;
  airline!: string;
  departureLocation: string = "";
  arrivalLocation: string = "";
  departureAirport: string = "";
  arrivalAirport: string = "";
  departureDate!: Date;
  arrivalDate!: Date;
  departureTime: string = "";
  arrivalTime: string = "";

  center!: google.maps.LatLngLiteral;
  zoom: number = 8;
  options!: google.maps.MapOptions;

  constructor(
    private sessionStorageService: SessionStorageService,
    private flightService: FlightService,
    private cd: ChangeDetectorRef
  ){}

  ngAfterViewInit(): void {
    const storedData = this.sessionStorageService.getItem('flightData');
    if(storedData){
      this.flightData = JSON.parse(storedData);
      console.log(this.flightData);
      this.airline = this.flightData.airline;
      this.departureLocation = this.flightData.departureLocation;
      this.arrivalLocation = this.flightData.arrivalLocation;
      this.departureAirport = this.flightData.departureAirport;
      this.arrivalAirport = this.flightData.arrivalAirport;
      this.departureTime = this.flightData.departureTime;
      this.arrivalTime = this.flightData.arrivalTime;
    }else{
      this.flightService.displayFlight$.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (flightData: any) => {
          console.log("bog");
          console.log(flightData);
          this.flightData = flightData;
          this.departureLocation = flightData.departureLocation;
          this.arrivalLocation = flightData.arrivalLocation;
          this.departureTime = flightData.departureTime;
          this.arrivalTime = flightData.arrivalTime;
          this.cd.detectChanges();
        },
        error: error => console.error(error)
      });
    }

    this.setMap();

    this.cd.detectChanges();
  }

  setMap(){
    // Set map options
    this.center = this.flightData.arrivalCoordinates; // Example: Center on Rome, Italy
    this.zoom = 8; // Set initial zoom level
    
    this.options = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      gestureHandling: 'auto' // Allow both touch and mouse gestures
    };
  }

  


  purchase(){
    console.log("Purchase!");
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
