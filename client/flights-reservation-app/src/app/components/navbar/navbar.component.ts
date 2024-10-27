import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit{
  visible: boolean = false;

  constructor(private cd: ChangeDetectorRef){}

  ngAfterViewInit(): void {
    if(typeof window !== 'undefined'){
      if(sessionStorage.getItem("user")){
        this.visible = true;
        this.cd.detectChanges();
      }
    }
  }
}
