import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { IGetAllInsurancePoliciesResponse } from '../Responses/IGetAllInsurancePoliciesResponse';
import { Observable } from 'rxjs';
import { IdRequest } from '../../../../Common/Requests/IdRequest';
import { IInsurancePolicyModel } from '../Models/IInsurancePolicyModel';
import { IOperationStatusResponse } from '../../../../Common/Responses/IOperationStatusResponse';
import { ICreateInsurancePolicyRequest } from '../Requests/ICreateInsurancePolicyRequest';
import { IUpdateInsurancePolicyRequest } from '../Requests/IUpdateInsurancePolicyRequest';
import { IGetInsurancePoliciesForMotorVehicleResponse } from '../Responses/IGetInsurancePoliciesForMotorVehicleResponse';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {

  constructor(private http: HttpClient) { }

  insurancePolicyUrl = ApiUrl + "InsurancePolicy/";

  GetAllInsurancePolicies(): Observable<IGetAllInsurancePoliciesResponse> {
    return this.http.get<IGetAllInsurancePoliciesResponse>(this.insurancePolicyUrl + "GetAllInsurancePolicies");
  }

  GetInsurancePolicyById(request: IdRequest): Observable<IInsurancePolicyModel> {
    return this.http.post<IInsurancePolicyModel>(this.insurancePolicyUrl + "GetInsurancePolicyById", request);
  }

  CreateInsurancePolicy(request: ICreateInsurancePolicyRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.insurancePolicyUrl + "CreateInsurancePolicy", request);
  }

  UpdateInsurancePolicy(request: IUpdateInsurancePolicyRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.insurancePolicyUrl + "UpdateInsurancePolicy", request);
  }

  DeleteInsurancePolicy(request: IdRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.insurancePolicyUrl + "DeleteInsurancePolicy", request);
  }

  GetInsurancePoliciesForMotorVehicleCreate(): Observable<IGetInsurancePoliciesForMotorVehicleResponse> {
    return this.http.get<IGetInsurancePoliciesForMotorVehicleResponse>(this.insurancePolicyUrl + "GetInsurancePoliciesForMotorVehicleCreate");
  }

  GetInsurancePoliciesForMotorVehicleUpdate(request: IdRequest): Observable<IGetInsurancePoliciesForMotorVehicleResponse> {
    return this.http.post<IGetInsurancePoliciesForMotorVehicleResponse>(this.insurancePolicyUrl + "GetInsurancePoliciesForMotorVehicleUpdate", request);
  }
}
