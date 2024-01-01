import { Component, OnInit } from '@angular/core';
import { IMotorVehicleTypeModel } from '../../Models/IMotorVehicleTypeModel';
import { MotorVehicleTypeService } from '../../Services/motor-vehicle-type.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { IdRequest } from '../../../../../Common/Requests/IdRequest';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-motor-vehicle-type',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-motor-vehicle-type.component.html',
  styleUrl: './list-motor-vehicle-type.component.css'
})
export class ListMotorVehicleTypeComponent implements OnInit {

  constructor(private motorVehicleTypeService: MotorVehicleTypeService, private router: Router, private toastr: ToastrService) { }

  motorVehicleTypes: IMotorVehicleTypeModel[] = [];

  searchTerm = "";

  ngOnInit(): void {
    this.Fetch();
  }

  Fetch() {
    this.motorVehicleTypeService.GetAllMotorVehicleTypes().pipe(take(1)).subscribe(x => {
      this.motorVehicleTypes = x.list;
    })
  }

  NavigateToCreate() {
    this.router.navigate(["add-motor-vehicle-type"])
  }

  Delete(id: number) {
    this.motorVehicleTypeService.DeleteMotorVehicleType(new IdRequest(id)).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Motor vehicle type deleted successfuly.", "Vehicle App");
        this.Fetch();
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }

  NavigateToEdit(id: number) {
    this.router.navigate(["edit-motor-vehicle-type/" + id]);
  }
}
