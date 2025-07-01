/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  
  isLandscape = false;

  constructor() {
    this.checkOrientation();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkOrientation();
  }

  checkOrientation() {

    this.isLandscape =  window.innerWidth <= 932 &&  window.innerHeight < 480 && window.innerWidth > window.innerHeight;

  }

  
}
