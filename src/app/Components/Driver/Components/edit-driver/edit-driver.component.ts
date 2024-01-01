import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DriverService } from '../../Services/driver.service';
import { IUpdateDriverRequest } from '../../Requests/IUpdateDriverRequest';
import { take } from 'rxjs';
import { IdRequest } from '../../../../../Common/Requests/IdRequest';

@Component({
  selector: 'app-edit-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-driver.component.html',
  styleUrl: './edit-driver.component.css'
})
export class EditDriverComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private driverService: DriverService,
    private toastr: ToastrService) { }

  request: IUpdateDriverRequest = {
    id: 0,
    firstName: "",
    lastName: ""
  }

  showFirstNameError = false;

  showLastNameError = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(take(1)).subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.driverService.GetDriverById(new IdRequest(parseInt(id)))
              .pipe(take(1)).subscribe(x => {
                this.request.id = x.id;
                this.request.firstName = x.firstName;
                this.request.lastName = x.lastName;
              })
          }
        }
      })
  }

  BackToList() {
    this.router.navigate(["list-drivers"])
  }

  Edit() {
    this.showFirstNameError = false;
    if (this.request.firstName.trim() === "") {
      this.showFirstNameError = true;
      return;
    }

    this.showLastNameError = false;
    if (this.request.lastName.trim() === "") {
      this.showLastNameError = true;
      return;
    }

    this.driverService.UpdateDriver(this.request).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Driver updated successfuly.", "Vehicle App");
        this.router.navigate(['list-drivers']);
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }
}
