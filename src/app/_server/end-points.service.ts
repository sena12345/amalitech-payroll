import { Injectable } from '@angular/core';
interface MyRoutes {
	home: string;
	users: string;
	user: string;
	prepareAccount: string;
}

@Injectable({
	providedIn: 'root'
})
export class EndPointsService {
	urls: MyRoutes = { home: '', user: '', users: '', prepareAccount: '' };
	constructor() {}
}
