import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, Platform } from '@ionic/angular';
import { IncidentServiceService } from 'src/app/services/incident-service.service';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { DomSanitizer}  from '@angular/platform-browser'
import { UserPhoto } from 'src/model/UserPhoto';
const IMAGE_DIR = "stored-images";
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreatePostPage implements OnInit {
  Name:any
  BriefDescription: any
  typeOfIncident:any
  public photos: UserPhoto[] = [];
  mainSavedimage:any
  NewSavedImage:any
  constructor(private postServe: IncidentServiceService) { }

  ngOnInit() {
  }
   
   
  async onAddPost(){
    this.postServe.postQuotes(this.Name,this.BriefDescription)
    .subscribe()
    this.postServe.uploadimage(this.NewSavedImage)
   }
   
   addImage(){
    this.addNewToGallery()
   }
  


 
 async addNewToGallery() {
  // Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Prompt,
    allowEditing: true,
    quality: 100,
    
  });
  const savedImageFile = await this.savePicture(capturedPhoto);
this.photos.unshift(savedImageFile);
  console.log(capturedPhoto)
  this.NewSavedImage = savedImageFile
  console.log(savedImageFile)
  
  
}

private async savePicture(photo: Photo) {
  // Convert photo to base64 format, required by Filesystem API to save
  const base64Data = await this.readAsBase64(photo);
  this.mainSavedimage = base64Data
  console.log(base64Data)
  // Write the file to the data directory
  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data
  });
    
   console.log("saved" , savedFile)
 
  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: photo.webPath,
    data: base64Data
  };
}

private async readAsBase64(photo: Photo) {

  // Fetch the photo, read as a blob, then convert to base64 format
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();
 
      console.log(blob)
  return await this.convertBlobToBase64(blob) as string;
}

private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});
  


}
