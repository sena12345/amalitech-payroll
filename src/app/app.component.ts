import { Component } from '@angular/core';
import { AuthServiceService } from './_services/auth-service.service';
import { AuthCredentials } from './_validation/auth-validator.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	currentUser: AuthCredentials = { email: '' };
	constructor() {}
}
