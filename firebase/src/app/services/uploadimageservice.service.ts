import { Injectable } from '@angular/core';
import { AngularFireMessaging} from '@angular/fire/compat/messaging'

@Injectable({
  providedIn: 'root'
})
export class UploadimageserviceService {
  
 
  constructor(private afMessaging:AngularFireMessaging ) { }
     requestPermission(){
      return this.afMessaging.requestToken.subscribe(
        (token:any) =>{
          console.log('store the token',token)
        }
      )

      
     }
    getMessage(){
      return this.afMessaging.messages;
    }
    
}