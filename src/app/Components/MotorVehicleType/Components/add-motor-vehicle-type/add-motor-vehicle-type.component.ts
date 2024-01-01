import { Component } from '@angular/core';
import { MotorVehicleTypeService } from '../../Services/motor-vehicle-type.service';
import { Router } from '@angular/router';
import { ICreateMotorVehicleTypeRequest } from '../../Requests/ICreateMotorVehicleTypeRequest';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-motor-vehicle-type',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-motor-vehicle-type.component.html',
  styleUrl: './add-motor-vehicle-type.component.css'
})
export class AddMotorVehicleTypeComponent {

  constructor(private motorVehicleTypeService: MotorVehicleTypeService,
    private router: Router,
    private toastr: ToastrService) { }

  request: ICreateMotorVehicleTypeRequest = {
    type: ""
  };

  showError = false;

  BackToList() {
    this.router.navigate(["list-motor-vehicle-type"])
  }

  Create() {
    this.showError = false;
    if (this.request.type.trim() === "") {
      this.showError = true;
      return;
    }

    this.motorVehicleTypeService.CreateMotorVehicleType(this.request).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Motor vehicle type created successfuly.", "Vehicle App");
        this.router.navigate(['list-motor-vehicle-type']);
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }
}
