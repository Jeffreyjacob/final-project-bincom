import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IncomingHttpHeaders } from 'http';
import { IncidentServiceService } from 'src/app/services/incident-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Incident } from 'src/model/Incident';

@Component({
  selector: 'app-get-all-post',
  templateUrl: './get-all-post.page.html',
  styleUrls: ['./get-all-post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GetAllPostPage implements OnInit {
  incident$ = collectionData(collection(this.firestore,'mycollection'),{
    idField: 'id'

  }) as Observable<Incident[]>
  

  constructor(private firestoreservice: IncidentServiceService,private  readonly firestore: Firestore,private router: Router) { }

  ngOnInit() {

  }
  createIncident(){
    this.router.navigateByUrl('create-post')
   }

}
