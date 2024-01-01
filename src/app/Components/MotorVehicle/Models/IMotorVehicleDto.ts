import { IDriverModel } from "../../Driver/Models/IDriverModel";

export interface IMotorVehicleDto {
    id: number;
    brand: string;
    model: string;
    motorVehicleType: string;
    insurancePolicy: string;
    drivers: IDriverModel[];
}