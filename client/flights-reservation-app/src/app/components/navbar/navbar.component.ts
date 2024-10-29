import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';

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

  constructor(
    private cd: ChangeDetectorRef,
    private sessionStorageService: SessionStorageService
  ){}

  ngAfterViewInit(): void {
    if(this.sessionStorageService.checkExistingItem("user")){
      this.visible = true;
      this.cd.detectChanges();
    }
  }
}
