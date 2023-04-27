import { Injectable } from '@angular/core';
import {Auth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private auth: Auth) { }
  async login( email:any ,password:any){
    return await signInWithEmailAndPassword(this.auth,email,password);
  }
  async signup(email:any ,password:any){
    return await createUserWithEmailAndPassword(this.auth,email,password);
  }
  async logOutUser(){
    return await signOut(this.auth);
  }
}
