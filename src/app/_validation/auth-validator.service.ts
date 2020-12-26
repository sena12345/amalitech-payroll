import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ObserverService } from '../_observers/observer.service';


export interface AuthCredentials {
  uid?: string;
	email: string;
  password?: string;
  displayName?: string;
  phoneNumber?: string;
  photoUrl?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  idToken?: Promise<string>;
  idTokenResult?: Promise<any>;
  claims?:any
}

@Injectable({
  providedIn: 'root'
})
export class AuthValidatorService extends ObserverService {
  constructor(private auth: AngularFireAuth) {
    super()
   
  }
  
  /**
  * authenticate use using email and password..
  * @param user AuthCredentials
  */
	public _loginWithEmailPassword(user: AuthCredentials) {
    this.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((user) => {
       
        this.updateNotice({ success: true, message: `Welcome, <b>${user.user.displayName == null ? user.user.email : user.user.displayName }</b>` });
      }).catch((err) =>  this.updateNotice({ success: false, message: err.message }) )
  }
  

  /**
   * authenticate user using predefined UI from firebase pop-auth
   */
	public _loginOrSignupWithEmailPop() {
		const provider = new firebase.default.auth.GoogleAuthProvider();
		this.auth
			.signInWithPopup(provider)
			.then((user) =>
      {
        if (user == null) { this.updateNotice({ success: false, message: "Try to signup again,User is empty." }); return; }

        if (!this._isVerified(user.user))
          this._verifyEmail(user.user)
        
      })
			.catch((err) => this.updateNotice({ success: false, message: err.message }))
			.finally(() => console.log('done signin with pop..'));
  }

  /**
   * create new user using email and password..
   * @param user AuthCredentials
   */
	public _signupEmailPassword(user: AuthCredentials) {
    this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(user => {
        this._verifyEmail(user.user)
      })
      .catch((err) => { this.updateNotice({ success: false, message: err.message }) } )
			.finally(() => console.log('done creating user with email/password..'));
  }

  public _updatePassword(user: AuthCredentials) {
     this._resetPassword(user)
  }

  public _updateEmail(newEmail:string) {
    this.auth.currentUser.then(user => {
      user.verifyBeforeUpdateEmail(newEmail).then(() => {
         this.updateNotice({success:true,message:'verify your email address to complete update!'})
       }).catch(err=>this.updateNotice({success:false,message:err.message}))
    })
  }

  public _updateOtherProfile(user:AuthCredentials) {
    //send request to api...
  }


  /**
   * Pass email address to send password reset link to..
   * @param user AuthCredentials
   */
  private _resetPassword(user: AuthCredentials) {
      this.auth.sendPasswordResetEmail(user.email).then(()=>this.updateNotice({success:true,message:'Reset link has been sent to your email!'})).catch(err=>this.updateNotice({success:false,message:err.message}))
  }

  /**
   * sign out current user..
   */
  public _signOut() {
    this.auth.signOut()
  }

/**
 * check if user is already verified..
 * @param user firebase.default.User
 */
  private _isVerified(user: firebase.default.User): boolean {
    return user.emailVerified;
  }

  /**
   * send verification email to user..
   * @param user firebase.default.User
   */
  private _verifyEmail(user: firebase.default.User) {
    if(!this._isVerified(user))
      user.sendEmailVerification({ url: 'http://localhost:4200/' }).then(()=>this.updateNotice({success:true,message:"verification link has been sent to your email!"}))
        .catch(err => { this.updateNotice({ success: false, message: err.message }) });
    else
      this.updateNotice({success: user.emailVerified,message:'You have successfuly authenticated!'})
  }


  /**
   * return firebase.default.User of current user object..
   */
  public async _getCurrentUser():Promise<AuthCredentials> {
    return this.auth.currentUser.then(user => {
        let cred : AuthCredentials =
       {
        uid: user.uid,
        email: user.email,
        password: null,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        idToken: user.getIdToken(),
        idTokenResult: user.getIdTokenResult(),
        claims: user
        }
      return cred;
     }).catch(err => { console.log(err.message);return null})
     
 
  
  }

}
