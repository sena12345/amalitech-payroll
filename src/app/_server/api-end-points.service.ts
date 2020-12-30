import { Injectable } from '@angular/core';

interface Api {
	home: string;
}
const _BASE_URL: string = 'http://localhost:4200/';
@Injectable({
	providedIn: 'root'
})
export class ApiEndPointsService {
	api: Api;
	constructor() {
		this.api = { home: this._format_url('home') };
	}

	private _format_url(endPoin: string): string {
		return _BASE_URL + endPoin;
	}
}
