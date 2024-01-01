import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { Observable } from 'rxjs';
import { IGetAllDriversResponse } from '../Responses/IGetAllDriversResponse';
import { IdRequest } from '../../../../Common/Requests/IdRequest';
import { IDriverModel } from '../Models/IDriverModel';
import { IOperationStatusResponse } from '../../../../Common/Responses/IOperationStatusResponse';
import { ICreateDriverRequest } from '../Requests/ICreateDriverRequest';
import { IUpdateDriverRequest } from '../Requests/IUpdateDriverRequest';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  driverUrl = ApiUrl + "Driver/";

  GetAllDrivers(): Observable<IGetAllDriversResponse> {
    return this.http.get<IGetAllDriversResponse>(this.driverUrl + "GetAllDrivers");
  }

  GetDriverById(request: IdRequest): Observable<IDriverModel> {
    return this.http.post<IDriverModel>(this.driverUrl + "GetDriverById", request);
  }

  CreateDriver(request: ICreateDriverRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.driverUrl + "CreateDriver", request);
  }

  UpdateDriver(request: IUpdateDriverRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.driverUrl + "UpdateDriver", request);
  }

  DeleteDriver(request: IdRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.driverUrl + "DeleteDriver", request);
  }
}
