import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, Platform } from '@ionic/angular';
import { IncidentServiceService } from 'src/app/services/incident-service.service';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { DomSanitizer}  from '@angular/platform-browser'
import { UserPhoto } from 'src/model/UserPhoto';
import { Router } from '@angular/router';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

import { UploadimageserviceService } from 'src/app/services/uploadimageservice.service';
import { Firestore } from '@angular/fire/firestore';
const IMAGE_DIR = "stored-images";
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class CreatePostPage implements OnInit {
  Name:any
  BriefDescription: any
  typeOfIncident:any
  Image:any
  Imagebolb:any
  ImageUrl:any

  CreateIncidentForm!: FormGroup;
  constructor(private firestoreService: IncidentServiceService,
    private firestore: Firestore,
    private loadingctrl: LoadingController,
    private alertctrl: AlertController,
    private router: Router,
    formbuilder: FormBuilder,
    private storage: Storage
    ) { 
      this.CreateIncidentForm = formbuilder.group({
        name: ['',[Validators.required]],
        TypeOfInicdent: ['',Validators.required],
        briefDescription: ['',Validators.required],
        locatonOfIncident: ['',Validators.required],
      })
    }

  ngOnInit() {
  }
  
  async createIncident(){
    const loading = this.loadingctrl.create()

    const name = this.CreateIncidentForm.value.name;
    const TypeOfInicdent = this.CreateIncidentForm.value.TypeOfInicdent;
    const briefDescription = this.CreateIncidentForm.value.briefDescription;
    const locatonOfIncident = this.CreateIncidentForm.value.locatonOfIncident;
    const image = this.ImageUrl
    this.firestoreService.createIncident(name,TypeOfInicdent,briefDescription,locatonOfIncident,image).then(
     async ()=>{
       (await loading).dismiss().then(()=>{
        this.router.navigateByUrl('get-all-post');
       });
     },
     async (error: any) =>{
      (await loading).dismiss().then(()=>{
        console.error(error);
      })
     }
    )
    return (await loading).present()
  }

  addNewToImage(){
    this.addNewToGallery()
  }

  async uploadImage(blob:any, ImageData:any){
    const  currentData = Date.now()
    const filePath = `test/${currentData}.${ImageData.format}`;
    const fileRef = ref(this.storage,filePath);
    console.log(filePath)
    const task = await uploadBytes(fileRef,blob);
    console.log('task ',task);
    const url = getDownloadURL(fileRef);
    return url;
}


 async addNewToGallery() {

       const capturedPhoto = await Camera.getPhoto({
     resultType: CameraResultType.DataUrl,
     source: CameraSource.Prompt,
     allowEditing: true,
     quality: 100,
   
   });
      this.Image = capturedPhoto.dataUrl
      console.log(this.Image);
     const bolb = this.dataURltobolb(capturedPhoto.dataUrl);
     console.log(bolb)
     const url = await this.uploadImage(bolb,capturedPhoto)
     this.ImageUrl = url
    console.log(this.ImageUrl)

 }


 dataURltobolb(dataUrl:any){
 var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
     u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
 }

    


}
