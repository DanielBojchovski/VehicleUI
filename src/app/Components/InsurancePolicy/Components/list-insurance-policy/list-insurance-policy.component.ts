import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InsurancePolicyService } from '../../Services/insurance-policy.service';
import { IInsurancePolicyModel } from '../../Models/IInsurancePolicyModel';
import { take } from 'rxjs';
import { IdRequest } from '../../../../../Common/Requests/IdRequest';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-insurance-policy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-insurance-policy.component.html',
  styleUrl: './list-insurance-policy.component.css'
})
export class ListInsurancePolicyComponent implements OnInit {

  constructor(private insurancePolicyService: InsurancePolicyService, private router: Router, private toastr: ToastrService) { }

  insurancePolicies: IInsurancePolicyModel[] = [];

  searchTerm = "";

  ngOnInit(): void {
    this.Fetch();
  }

  Fetch() {
    this.insurancePolicyService.GetAllInsurancePolicies().pipe(take(1)).subscribe(x => {
      this.insurancePolicies = x.list;
    })
  }

  NavigateToCreate() {
    this.router.navigate(["add-insurance-policy"])
  }

  Delete(id: number) {
    this.insurancePolicyService.DeleteInsurancePolicy(new IdRequest(id)).pipe(take(1)).subscribe(x => {
      if (x.isSuccessful) {
        this.toastr.success("Insurance policy deleted successfuly.", "Vehicle App");
        this.Fetch();
      }
      else {
        this.toastr.error(x.message, "Vehicle App");
      }
    })
  }

  NavigateToEdit(id: number) {
    this.router.navigate(["edit-insurance-policy/" + id]);
  }
}
