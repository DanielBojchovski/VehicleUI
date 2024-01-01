import { IDriverModel } from "../../Driver/Models/IDriverModel";

export interface IMotorVehicleModel {
    id: number;
    brand: string;
    model: string;
    motorVehicleTypeId: number;
    insurancePolicyId: number;
    drivers: IDriverModel[];
}