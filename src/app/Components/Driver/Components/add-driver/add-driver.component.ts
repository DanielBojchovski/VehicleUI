import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../../Services/driver.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICreateDriverRequest } from '../../Requests/ICreateDriverRequest';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {
  constructor(private driverService: DriverService,
    private router: Router,
    private toastr: ToastrService) { }

  request: ICreateDriverRequest = {
    firstName: "",
    lastName: ""
  };

  showFirstNameError = false;

  showLastNameError = false;

  BackToList() {
    this.router.navigate(["list-drivers"])
  }

  Create() {
    this.showFirstNameError = false;
    this.showLastNameError = false;
    if (this.request.firstName.trim() === "") {
      this.showFirstNameError = true;
      return;
    }
    if (this.request.lastName.trim() === "") {
      this.showLastNameError = true;
      return;
    }

    this.driverService.CreateDriver(this.request).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Driver created successfuly.", "Vehicle App");
        this.router.navigate(['list-drivers']);
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }
}
