import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EndPointsService } from './_server/end-points.service';
const ep: EndPointsService = new EndPointsService();
const routes: Routes = [];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],

	exports: [ RouterModule ]
})
export class AppRoutingModule {}
