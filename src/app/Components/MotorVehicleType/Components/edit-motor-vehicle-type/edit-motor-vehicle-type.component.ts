import { Component, OnInit } from '@angular/core';
import { MotorVehicleTypeService } from '../../Services/motor-vehicle-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IdRequest } from '../../../../../Common/Requests/IdRequest';
import { IUpdateMotorVehicleTypeRequest } from '../../Requests/IUpdateMotorVehicleTypeRequest';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-motor-vehicle-type',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-motor-vehicle-type.component.html',
  styleUrl: './edit-motor-vehicle-type.component.css'
})
export class EditMotorVehicleTypeComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private motorVehicleTypeService: MotorVehicleTypeService,
    private toastr: ToastrService) { }

  request: IUpdateMotorVehicleTypeRequest = {
    id: 0,
    type: ""
  }

  showError = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(take(1)).subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.motorVehicleTypeService.GetMotorVehicleTypeById(new IdRequest(parseInt(id)))
              .pipe(take(1)).subscribe(x => {
                this.request.id = x.id;
                this.request.type = x.type;
              })
          }
        }
      })
  }

  BackToList() {
    this.router.navigate(["list-motor-vehicle-type"])
  }

  Edit() {
    this.showError = false;
    if (this.request.type.trim() === "") {
      this.showError = true;
      return;
    }

    this.motorVehicleTypeService.UpdateMotorVehicleType(this.request).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Motor vehicle type updated successfuly.", "Vehicle App");
        this.router.navigate(['list-motor-vehicle-type']);
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }
}
