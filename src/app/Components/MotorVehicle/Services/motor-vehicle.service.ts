import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { IGetAllMotorVehiclesResponse } from '../Responses/IGetAllMotorVehiclesResponse';
import { Observable } from 'rxjs';
import { IdRequest } from '../../../../Common/Requests/IdRequest';
import { IMotorVehicleModel } from '../Models/IMotorVehicleModel';
import { ICreateMotorVehicleRequest } from '../Requests/ICreateMotorVehicleRequest';
import { IOperationStatusResponse } from '../../../../Common/Responses/IOperationStatusResponse';
import { IUpdateMotorVehicleRequest } from '../Requests/IUpdateMotorVehicleRequest';

@Injectable({
  providedIn: 'root'
})
export class MotorVehicleService {

  constructor(private http: HttpClient) { }

  motorVehiclUrl = ApiUrl + "MotorVehicle/";

  GetAllMotorVehicles(): Observable<IGetAllMotorVehiclesResponse> {
    return this.http.get<IGetAllMotorVehiclesResponse>(this.motorVehiclUrl + "GetAllMotorVehicles");
  }

  GetMotorVehicleById(request: IdRequest): Observable<IMotorVehicleModel> {
    return this.http.post<IMotorVehicleModel>(this.motorVehiclUrl + "GetMotorVehicleById", request);
  }

  CreateMotorVehicle(request: ICreateMotorVehicleRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.motorVehiclUrl + "CreateMotorVehicle", request);
  }

  UpdateMotorVehicle(request: IUpdateMotorVehicleRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.motorVehiclUrl + "UpdateMotorVehicle", request);
  }

  DeleteMotorVehicle(request: IdRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.motorVehiclUrl + "DeleteMotorVehicle", request);
  }
}
