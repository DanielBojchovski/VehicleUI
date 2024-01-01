import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }

  title = 'VehicleUI';

  NavToVehicleTypes() {
    this.router.navigate(["list-motor-vehicle-type"])
  }

  NavToPolicies() {
    this.router.navigate(["list-insurance-policies"])
  }

  NavToDrivers() {
    this.router.navigate(["list-drivers"])
  }

  NavToVehicles() {
    this.router.navigate(["list-motor-vehicles"])
  }
}
