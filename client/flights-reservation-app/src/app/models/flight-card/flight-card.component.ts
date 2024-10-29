import { CommonModule } from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightCardComponent implements AfterViewInit{
  constructor(private cd: ChangeDetectorRef){}

  @Input() id!: number;
  @Input() departureAirport!: string;
  @Input() departureLocation!: string;
  @Input() departureTime!: Date;
  @Input() arrivalAirport!: string;
  @Input() arrivalLocation!: string;
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
}
