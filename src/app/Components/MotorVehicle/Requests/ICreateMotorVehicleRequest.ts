export interface ICreateMotorVehicleRequest {
    brand: string;
    model: string;
    motorVehicleTypeId: number;
    insurancePolicyId: number;
    selectedDriversIds: number[];
}