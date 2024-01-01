import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MotorVehicleService } from '../../Services/motor-vehicle.service';
import { DriverService } from '../../../Driver/Services/driver.service';
import { take } from 'rxjs';
import { ICheckBoxItem } from '../../../../../Common/Models/ICheckBoxItem';
import { MotorVehicleTypeService } from '../../../MotorVehicleType/Services/motor-vehicle-type.service';
import { IDropDownItem } from '../../../../../Common/Models/IDropDownItem';
import { InsurancePolicyService } from '../../../InsurancePolicy/Services/insurance-policy.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICreateMotorVehicleRequest } from '../../Requests/ICreateMotorVehicleRequest';

@Component({
  selector: 'app-add-motor-vehicle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-motor-vehicle.component.html',
  styleUrl: './add-motor-vehicle.component.css'
})
export class AddMotorVehicleComponent implements OnInit {

  constructor(private motorVehicleService: MotorVehicleService,
    private driverService: DriverService,
    private motorVehicleTypeService: MotorVehicleTypeService,
    private insurancePolicyService: InsurancePolicyService,
    private router: Router,
    private toastr: ToastrService){}

    request: ICreateMotorVehicleRequest = {
      brand: "",
      model: "",
      motorVehicleTypeId: 0,
      insurancePolicyId: 0,
      selectedDriversIds: []
    }

  drivers: ICheckBoxItem[] = [];
  motorVehicleTypes: IDropDownItem[] = [];
  insurancePolicies: IDropDownItem[] = [];

  showErrorBrand = false;

  showErrorModel = false;

  showErrorMotorVehicleType = false;

  showErrorInsurancePolicy = false;

  showErrorDrivers = false;
  
  ngOnInit(): void {
    this.driverService.GetAllDrivers().pipe(take(1)).subscribe(x => {
      x.list.forEach(x => {
        this.drivers.push({id: x.id, label: x.firstName + " " + x.lastName, isSelected: false});
      })
    })

    this.motorVehicleTypeService.GetAllMotorVehicleTypes().pipe(take(1)).subscribe(x => {
      x.list.forEach(x => {
        this.motorVehicleTypes.push({id: x.id, name: x.type});
      })
    })

    this.insurancePolicyService.GetInsurancePoliciesForMotorVehicleCreate().pipe(take(1)).subscribe(x => {
      x.list.forEach(x => {
        this.insurancePolicies.push({id: x.id, name: x.policyProvider});
      })
    })
  }

  BackToList() {
    this.router.navigate(["list-motor-vehicles"])
  }

  Create() {
 
    this.showErrorBrand = false;
    this.showErrorModel = false;
    this.showErrorMotorVehicleType = false;
    this.showErrorInsurancePolicy = false;
    this.showErrorDrivers = false;

    if (this.request.brand.trim() === "") {
      this.showErrorBrand = true;
      return;
    }

    if (this.request.model.trim() === "") {
      this.showErrorModel = true;
      return;
    }

    if (this.request.motorVehicleTypeId === 0) {
      this.showErrorMotorVehicleType = true;
      return;
    }

    if (this.request.insurancePolicyId === 0) {
      this.showErrorInsurancePolicy = true;
      return;
    }

    if (this.request.selectedDriversIds.length === 0) {
      this.showErrorDrivers = true;
      return;
    }

    this.motorVehicleService.CreateMotorVehicle(this.request).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Motor vehicle created successfuly.", "Vehicle App");
        this.router.navigate(['list-motor-vehicles']);
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }

  updateSelectedValues(option: ICheckBoxItem){
    if (option.isSelected) {
      this.request.selectedDriversIds.push(option.id);
    } else {
      this.request.selectedDriversIds = this.request.selectedDriversIds.filter(id => id !== option.id);
    }
  }
}
