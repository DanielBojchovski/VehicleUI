import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { IGetAllMotorVehicleTypesResponse } from '../Responses/IGetAllMotorVehicleTypesResponse';
import { Observable } from 'rxjs';
import { IdRequest } from '../../../../Common/Requests/IdRequest';
import { IMotorVehicleTypeModel } from '../Models/IMotorVehicleTypeModel';
import { ICreateMotorVehicleTypeRequest } from '../Requests/ICreateMotorVehicleTypeRequest';
import { IOperationStatusResponse } from '../../../../Common/Responses/IOperationStatusResponse';
import { IUpdateMotorVehicleTypeRequest } from '../Requests/IUpdateMotorVehicleTypeRequest';

@Injectable({
  providedIn: 'root'
})
export class MotorVehicleTypeService {

  constructor(private http: HttpClient) { }

  motorVehicleTypeUrl = ApiUrl + "MotorVehicleType/";

  GetAllMotorVehicleTypes(): Observable<IGetAllMotorVehicleTypesResponse> {
    return this.http.get<IGetAllMotorVehicleTypesResponse>(this.motorVehicleTypeUrl + "GetAllMotorVehicleTypes");
  }

  GetMotorVehicleTypeById(request: IdRequest): Observable<IMotorVehicleTypeModel> {
    return this.http.post<IMotorVehicleTypeModel>(this.motorVehicleTypeUrl + "GetMotorVehicleTypeById", request);
  }

  CreateMotorVehicleType(request: ICreateMotorVehicleTypeRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.motorVehicleTypeUrl + "CreateMotorVehicleType", request);
  }

  UpdateMotorVehicleType(request: IUpdateMotorVehicleTypeRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.motorVehicleTypeUrl + "UpdateMotorVehicleType", request);
  }

  DeleteMotorVehicleType(request: IdRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.motorVehicleTypeUrl + "DeleteMotorVehicleType", request);
  }
}
