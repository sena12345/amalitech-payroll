import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EndPointsService } from './_server/end-points.service';

const ep: EndPointsService = new EndPointsService();

import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: '', component:LoginComponent}
];


@NgModule({
	imports: [ RouterModule.forRoot(routes) ],

	exports: [ RouterModule ]
})
export class AppRoutingModule {}
