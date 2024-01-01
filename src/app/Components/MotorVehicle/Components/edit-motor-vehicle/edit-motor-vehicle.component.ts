import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MotorVehicleService } from '../../Services/motor-vehicle.service';
import { DriverService } from '../../../Driver/Services/driver.service';
import { MotorVehicleTypeService } from '../../../MotorVehicleType/Services/motor-vehicle-type.service';
import { InsurancePolicyService } from '../../../InsurancePolicy/Services/insurance-policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUpdateDriverRequest } from '../../../Driver/Requests/IUpdateDriverRequest';
import { IUpdateMotorVehicleRequest } from '../../Requests/IUpdateMotorVehicleRequest';
import { ICheckBoxItem } from '../../../../../Common/Models/ICheckBoxItem';
import { IDropDownItem } from '../../../../../Common/Models/IDropDownItem';
import { take } from 'rxjs';
import { IdRequest } from '../../../../../Common/Requests/IdRequest';

@Component({
  selector: 'app-edit-motor-vehicle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-motor-vehicle.component.html',
  styleUrl: './edit-motor-vehicle.component.css'
})
export class EditMotorVehicleComponent implements OnInit {
  constructor(private motorVehicleService: MotorVehicleService,
    private driverService: DriverService,
    private motorVehicleTypeService: MotorVehicleTypeService,
    private insurancePolicyService: InsurancePolicyService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute){}

    request: IUpdateMotorVehicleRequest = {
      id: 0,
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

      this.activatedRoute.paramMap
      .pipe(take(1)).subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.insurancePolicyService.GetInsurancePoliciesForMotorVehicleUpdate(new IdRequest(parseInt(id))).pipe(take(1)).subscribe(x => {
              x.list.forEach(x => {
                this.insurancePolicies.push({id: x.id, name: x.policyProvider});
              })
            })
            this.motorVehicleService.GetMotorVehicleById(new IdRequest(parseInt(id)))
              .pipe(take(1)).subscribe(x => {
                this.request.id = x.id;
                this.request.brand = x.brand;
                this.request.model = x.model;
                this.request.insurancePolicyId = x.insurancePolicyId;
                this.request.motorVehicleTypeId = x.motorVehicleTypeId;
                this.request.selectedDriversIds = x.drivers.map(driver => driver.id);
                this.drivers.forEach(driver => {
                  driver.isSelected = this.request.selectedDriversIds.includes(driver.id);
              });
              })
          }
        }
      })
    }

    BackToList() {
      this.router.navigate(["list-motor-vehicles"])
    }

    Edit(){

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

      this.motorVehicleService.UpdateMotorVehicle(this.request).pipe(take(1)).subscribe(x => {
        if (x.isSuccessful) {
          this.toastr.success("Motor vehicle updated successfuly.", "Vehicle App");
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
