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
  private url: string = "https://trimestrial-fee.000webhostapp.com/wp-json/wp/v2/posts"
  private tokenUrl: string = "https://trimestrial-fee.000webhostapp.com/wp-json/jwt-auth/v1/token";
  private MediaUrl:string = "https://trimestrial-fee.000webhostapp.com/wp-json/wp/v2/media"
  public photos:UserPhoto[] = [];
  mainSavedimage:any
  mainFileName:any
  formData =  new FormData()
  constructor(private firestore: Firestore,private http: HttpClient) { }

  createIncident(
    name: string,
    TypeOfInicdent: string,
    briefDescription: string,
    locatonOfIncident: string
  ){
    return addDoc(collection(this.firestore,'mycollection'),{
      name,
      TypeOfInicdent,
      briefDescription,
      locatonOfIncident,

    })   
  }

  private errorHandle(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error('error Message:', error.message);
    } else{
      console.error(
        `Error status: ${error.status}` + `Body: ${error.error}`
      )
    }
    return throwError('check the code and server response from the end point')
    }
  
    getPost(){
      return this.http.get(this.url).pipe(
        map(this.dataExtract),
        catchError(this.errorHandle)
      )
    }
  
    private dataExtract(res: any){
      const body  = res;
      return body
    }
  
    
  postQuotes(title:any,content:any){
    let data = {
      title: title,
      content: content,
      status: 'publish'
    };
    console.log(data);
    
    const username = "admin"
    const password = "Greatness4sure"

    const tokens = this.http.post(this.tokenUrl,{username,password});
    const token =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RyaW1lc3RyaWFsLWZlZS4wMDB3ZWJob3N0YXBwLmNvbSIsImlhdCI6MTY4MjQ2NDMwOSwibmJmIjoxNjgyNDY0MzA5LCJleHAiOjE2ODMwNjkxMDksImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.QIFycl2cfmuv5Oqwior3t5j7HPlMGwNcAse_tfCr9oA"
    console.log(token)

    let headers = new HttpHeaders({
      'Content-type':'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    
    return this.http.post(this.url, data,{headers: headers});
}

 async uploadimage(File:any){
  
       const  response = await fetch(File.data)
        const bolb =  await response.blob()
        this.formData.append('file',bolb,File.name)
  
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RyaW1lc3RyaWFsLWZlZS4wMDB3ZWJob3N0YXBwLmNvbSIsImlhdCI6MTY4MjQ2NDMwOSwibmJmIjoxNjgyNDY0MzA5LCJleHAiOjE2ODMwNjkxMDksImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.QIFycl2cfmuv5Oqwior3t5j7HPlMGwNcAse_tfCr9oA"
  let headers = new HttpHeaders({
    'cache-control':'no-cache',
    'Content-type':'application/json',
    'content-dispostion': `attachment; filename=+ filename + jpeg`,
    'Authorization': `Bearer ${token}`
  });

  return this.http.post(this.MediaUrl,this.formData,{headers: headers})

 }
   
 
}