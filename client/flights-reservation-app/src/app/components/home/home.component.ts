import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subject, takeUntil } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Flight } from '../../models/Flight';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    NavbarComponent,
    MatIconModule,
    MatFormFieldModule, 
    ReactiveFormsModule,
    FormsModule,
    MatInputModule, 
    MatDatepickerModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  searchForm!: FormGroup; // Removed private since it should be accessible in the template
  private destroy$ = new Subject<void>();
  destinations: string[] = [];
  departures: string[] = [];
  
  constructor(
    private router: Router,
    private searchService: SearchService,
    private cookieService: CookieService,
    private cd: ChangeDetectorRef
  ) {
    this.searchForm = new FormGroup({
      departureLocation: new FormControl<string>('', Validators.required),
      arrivalLocation: new FormControl<string>('', Validators.required),
      departureDate: new FormControl<Date | null>(null, Validators.required),
      departureTime: new FormControl<string>('00:00')
    });
  }
  ngAfterViewInit(): void {
    //get possible departures
    this.departures = this.searchService.getDepartures(this.destroy$);
    this.destinations = this.searchService.getDestinations(this.destroy$);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    // Get user ID or other initialization logic
  }

  search() {
    if (this.searchForm.valid) {
      const searchParameters = this.searchForm.value;
      sessionStorage.setItem("searchParameters", JSON.stringify(searchParameters)); // Store in sessionStorage
      console.log("SET THIS SESSION STORAGE: ", searchParameters);
      this.searchService.search$.next(searchParameters);
      this.router.navigate(['/search-page']);
    }
  }
  
}
