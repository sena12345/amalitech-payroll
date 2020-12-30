import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';

import { AngularFireModule } from '@angular/fire';

@NgModule({
	declarations: [ AppComponent,LoginComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule,
		AngularFireModule.initializeApp(environment.firebaseConfig)
	],

	providers: [],
	bootstrap: [ AppComponent ]

})
export class AppModule {}
