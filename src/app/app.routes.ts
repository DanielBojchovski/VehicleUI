import { Routes } from '@angular/router';
import { ListMotorVehicleTypeComponent } from './Components/MotorVehicleType/Components/list-motor-vehicle-type/list-motor-vehicle-type.component';
import { AddMotorVehicleTypeComponent } from './Components/MotorVehicleType/Components/add-motor-vehicle-type/add-motor-vehicle-type.component';
import { EditMotorVehicleTypeComponent } from './Components/MotorVehicleType/Components/edit-motor-vehicle-type/edit-motor-vehicle-type.component';
import { ListInsurancePolicyComponent } from './Components/InsurancePolicy/Components/list-insurance-policy/list-insurance-policy.component';
import { AddInsurancePolicyComponent } from './Components/InsurancePolicy/Components/add-insurance-policy/add-insurance-policy.component';
import { EditInsurancePolicyComponent } from './Components/InsurancePolicy/Components/edit-insurance-policy/edit-insurance-policy.component';
import { ListDriverComponent } from './Components/Driver/Components/list-driver/list-driver.component';
import { EditDriverComponent } from './Components/Driver/Components/edit-driver/edit-driver.component';
import { AddDriverComponent } from './Components/Driver/Components/add-driver/add-driver.component';
import { ListMotorVehicleComponent } from './Components/MotorVehicle/Components/list-motor-vehicle/list-motor-vehicle.component';
import { AddMotorVehicleComponent } from './Components/MotorVehicle/Components/add-motor-vehicle/add-motor-vehicle.component';
import { EditMotorVehicleComponent } from './Components/MotorVehicle/Components/edit-motor-vehicle/edit-motor-vehicle.component';

export const routes: Routes = [
    { path: '', component: ListMotorVehicleTypeComponent },
    { path: 'list-motor-vehicle-type', component: ListMotorVehicleTypeComponent },
    { path: 'add-motor-vehicle-type', component: AddMotorVehicleTypeComponent },
    { path: 'edit-motor-vehicle-type/:id', component: EditMotorVehicleTypeComponent },
    { path: 'list-insurance-policies', component: ListInsurancePolicyComponent },
    { path: 'add-insurance-policy', component: AddInsurancePolicyComponent },
    { path: 'edit-insurance-policy/:id', component: EditInsurancePolicyComponent },
    { path: 'list-drivers', component: ListDriverComponent },
    { path: 'add-driver', component: AddDriverComponent },
    { path: 'edit-driver/:id', component: EditDriverComponent },

    { path: 'list-motor-vehicles', component: ListMotorVehicleComponent },
    { path: 'add-motor-vehicle', component: AddMotorVehicleComponent },
    { path: 'edit-motor-vehicle/:id', component: EditMotorVehicleComponent },
];
