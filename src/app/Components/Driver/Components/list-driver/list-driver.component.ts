import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../Services/driver.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IDriverModel } from '../../Models/IDriverModel';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { IdRequest } from '../../../../../Common/Requests/IdRequest';

@Component({
  selector: 'app-list-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-driver.component.html',
  styleUrl: './list-driver.component.css'
})
export class ListDriverComponent implements OnInit {

  constructor(private driverService: DriverService, private router: Router, private toastr: ToastrService) { }

  drivers: IDriverModel[] = [];

  searchTerm = "";

  ngOnInit(): void {
    this.Fetch();
  }

  Fetch() {
    this.driverService.GetAllDrivers().pipe(take(1)).subscribe(x => {
      this.drivers = x.list;
    })
  }

  NavigateToCreate() {
    this.router.navigate(["add-driver"])
  }

  Delete(id: number) {
    this.driverService.DeleteDriver(new IdRequest(id)).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Driver deleted successfuly.", "Vehicle App");
        this.Fetch();
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }

  NavigateToEdit(id: number) {
    this.router.navigate(["edit-driver/" + id]);
  }
}
