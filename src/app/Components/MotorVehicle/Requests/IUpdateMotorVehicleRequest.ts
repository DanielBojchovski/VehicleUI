export interface IUpdateMotorVehicleRequest {
    id: number;
    brand: string;
    model: string;
    motorVehicleTypeId: number;
    insurancePolicyId: number;
    selectedDriversIds: number[];
}