import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InsurancePolicyService } from '../../Services/insurance-policy.service';
import { ICreateInsurancePolicyRequest } from '../../Requests/ICreateInsurancePolicyRequest';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-insurance-policy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-insurance-policy.component.html',
  styleUrl: './add-insurance-policy.component.css'
})
export class AddInsurancePolicyComponent {

  constructor(private insurancePolicyService: InsurancePolicyService,
    private router: Router,
    private toastr: ToastrService) { }

  request: ICreateInsurancePolicyRequest = {
    policyProvider: ""
  };

  showError = false;

  BackToList() {
    this.router.navigate(["list-insurance-policies"])
  }

  Create() {
    this.showError = false;
    if (this.request.policyProvider.trim() === "") {
      this.showError = true;
      return;
    }

    this.insurancePolicyService.CreateInsurancePolicy(this.request).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Insurance policy created successfuly.", "Vehicle App");
        this.router.navigate(['list-insurance-policies']);
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }
}
