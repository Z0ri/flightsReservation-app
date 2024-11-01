import { CommonModule } from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightCardComponent implements AfterViewInit{
  constructor(
    private flightService: FlightService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private cd: ChangeDetectorRef){}

  @Input() id!: number;
  @Input() departureAirport!: string;
  @Input() departureLocation!: string;
  @Input() departureCoordinates!: any;
  @Input() departureTime!: Date;
  @Input() arrivalAirport!: string;
  @Input() arrivalLocation!: string;
  @Input() arrivalCoordinates!: any;
  @Input() arrivalTime!: Date;
  @Input() price!: number;
  @Input() credits!: number;

  departureDate!: Date;
  arrivalDate!: Date;

  ngAfterViewInit(): void {
    //convert times from strings to dates
    this.departureDate = new Date(this.departureTime);
    this.arrivalDate = new Date(this.arrivalTime);
    this.cd.detectChanges();
  }

  viewFlight(){
    const flightData = {
      id: this.id,
      departureAirport: this.departureAirport,
      departureLocation: this.departureLocation,
      departureCoordinates: this.departureCoordinates,
      departureDate: this.departureDate,
      departureTime: this.departureTime,
      arrivalAirport: this.arrivalAirport,
      arrivalLocation: this.arrivalLocation,
      arrivalCoordinates: this.arrivalCoordinates,
      arrivalDate: this.arrivalDate,
      arrivalTime: this.arrivalTime,
      price: this.price,
      credits: this.credits,
    };

    this.sessionStorageService.setItem("flightData", JSON.stringify(flightData));

    this.flightService.displayFlight$.next(flightData);
    this.router.navigate(['/flight-page']);
  }
}
