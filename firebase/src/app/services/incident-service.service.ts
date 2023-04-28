import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData,onSnapshot} from '@angular/fire/firestore'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { UserPhoto } from 'src/model/UserPhoto';
import { type } from 'os';


@Injectable({
  providedIn: 'root' 
})
export class IncidentServiceService {
 
  public photos:UserPhoto[] = [];
  mainSavedimage:any
  mainFileName:any
  formData =  new FormData()

  constructor(private firestore: Firestore,private http: HttpClient) { }
 
  createIncident(
    name: string,
    TypeOfInicdent: string,
    briefDescription: string,
    locatonOfIncident: string,
    Image:string
  ){
    return addDoc(collection(this.firestore,'mycollection'),{
      name,
      TypeOfInicdent,
      briefDescription,
      locatonOfIncident,
      Image
    })   
  }

   
 
}