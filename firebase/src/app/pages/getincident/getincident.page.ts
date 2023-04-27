import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IncidentServiceService } from 'src/app/services/incident-service.service';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Incident } from 'src/model/Incident';
import { Router } from '@angular/router';




@Component({
  selector: 'app-getincident',
  templateUrl: './getincident.page.html',
  styleUrls: ['./getincident.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class GetincidentPage implements OnInit {

  postData: any 
  constructor(private postServe: IncidentServiceService,private router: Router) { }

  ngOnInit() {
  }


  async getData(){
    await  this.postServe.getPost()
    .subscribe(
      res =>{
        console.log(res);
        this.postData =res;
        console.log(this.postData);
      }, err =>{
        console.log(err);
      }
    )
  }
  createPost(){
   this.router.navigateByUrl('create-post')
  }
}
