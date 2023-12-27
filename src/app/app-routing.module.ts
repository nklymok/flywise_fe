import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengerComponent } from './passenger/passenger.component';
import { MatIconModule } from '@angular/material/icon';
import { AirplaneComponent } from './airplane/airplane.component';

const routes: Routes = [
  { path: '', redirectTo: '/passenger', pathMatch: 'full' }, // Redirect default route to /passenger
  { path: 'passenger', component: PassengerComponent },
  { path: 'airplane', component: AirplaneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatIconModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
