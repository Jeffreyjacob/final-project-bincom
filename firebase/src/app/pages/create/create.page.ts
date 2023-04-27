import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IncidentServiceService } from 'src/app/services/incident-service.service';
import { loadBundle } from 'firebase/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class CreatePage implements OnInit {
  CreateIncidentForm!: FormGroup;
  constructor(
    private loadingctrl: LoadingController,
    private alertctrl: AlertController,
    private router: Router,
    private firestoreService: IncidentServiceService,
    formbuilder: FormBuilder
  ) { 
    this.CreateIncidentForm = formbuilder.group({
      name: ['',[Validators.required]],
      TypeOfInicdent: ['',Validators.required],
      briefDescription: ['',Validators.required],
      locatonOfIncident: ['',Validators.required]
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

    this.firestoreService.createIncident(name,TypeOfInicdent,briefDescription,locatonOfIncident).then(
     async ()=>{
       (await loading).dismiss().then(()=>{
        this.router.navigateByUrl('getincident');
       });
     },
     async error =>{
      (await loading).dismiss().then(()=>{
        console.error(error);
      })
     }
    )
    return (await loading).present()
  }
  

}
