import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InsurancePolicyService } from '../../Services/insurance-policy.service';
import { IUpdateInsurancePolicyRequest } from '../../Requests/IUpdateInsurancePolicyRequest';
import { take } from 'rxjs';
import { IdRequest } from '../../../../../Common/Requests/IdRequest';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-insurance-policy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-insurance-policy.component.html',
  styleUrl: './edit-insurance-policy.component.css'
})
export class EditInsurancePolicyComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private insurancePolicyService: InsurancePolicyService,
    private toastr: ToastrService) { }

  request: IUpdateInsurancePolicyRequest = {
    id: 0,
    policyProvider: ""
  }

  showError = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(take(1)).subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.insurancePolicyService.GetInsurancePolicyById(new IdRequest(parseInt(id)))
              .pipe(take(1)).subscribe(x => {
                this.request.id = x.id;
                this.request.policyProvider = x.policyProvider;
              })
          }
        }
      })
  }

  BackToList() {
    this.router.navigate(["list-insurance-policies"])
  }

  Edit() {
    this.showError = false;
    if (this.request.policyProvider.trim() === "") {
      this.showError = true;
      return;
    }

    this.insurancePolicyService.UpdateInsurancePolicy(this.request).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Insurance policy updated successfuly.", "Vehicle App");
        this.router.navigate(['list-insurance-policies']);
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }
}
