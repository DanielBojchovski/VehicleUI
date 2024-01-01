import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MotorVehicleService } from '../../Services/motor-vehicle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IMotorVehicleDto } from '../../Models/IMotorVehicleDto';
import { take } from 'rxjs';
import { IdRequest } from '../../../../../Common/Requests/IdRequest';

@Component({
  selector: 'app-list-motor-vehicle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-motor-vehicle.component.html',
  styleUrl: './list-motor-vehicle.component.css'
})
export class ListMotorVehicleComponent implements OnInit {

  constructor(private motorVehicleService: MotorVehicleService, private router: Router, private toastr: ToastrService) { }

  motorVehicles: IMotorVehicleDto[] = [];

  searchTerm = "";

  ngOnInit(): void {
    this.Fetch();
  }

  Fetch() {
    this.motorVehicleService.GetAllMotorVehicles().pipe(take(1)).subscribe(x => {
      this.motorVehicles = x.list;
    })
  }

  NavigateToCreate() {
    this.router.navigate(["add-motor-vehicle"])
  }

  Delete(id: number) {
    this.motorVehicleService.DeleteMotorVehicle(new IdRequest(id)).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Motor Vehicle deleted successfuly.", "Vehicle App");
        this.Fetch();
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }

  NavigateToEdit(id: number) {
    this.router.navigate(["edit-motor-vehicle/" + id]);
  }
}
