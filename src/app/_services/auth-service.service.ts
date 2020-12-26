import { Injectable } from '@angular/core';
import { AuthCredentials, AuthValidatorService } from '../_validation/auth-validator.service';

@Injectable({
	providedIn: 'root'
})
export class AuthServiceService {
	constructor(private _user: AuthValidatorService) {}

	public async _currentUser(): Promise<AuthCredentials> {
		let user: AuthCredentials = await this._user._getCurrentUser();
		return user;
	}

	public _updateEmail(newEmail: string) {
		this._user._updateEmail(newEmail);
	}

	public _updatePassword(credentials: AuthCredentials) {
		this._user._updatePassword(credentials);
	}

	public;

	public _signInWithEmailAndPassword(credentials: AuthCredentials) {
		this._user._loginWithEmailPassword(credentials);
	}

	public _loginOrSignupWithEmailPop() {
		this._user._loginOrSignupWithEmailPop();
	}

	public _createAccount(credentials: AuthCredentials) {
		this._user._signupEmailPassword(credentials);
	}

	public _sendResetLink(credentials: AuthCredentials) {
		this._user._updatePassword(credentials);
	}

	public _signOut() {
		this._user._signOut();
	}
}
