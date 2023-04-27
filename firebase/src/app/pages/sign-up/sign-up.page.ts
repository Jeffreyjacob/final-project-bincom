import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignUpPage implements OnInit {
  email:any
  password:any
  constructor(private auth: AuthServiceService, 
    private loadingctrl: LoadingController,
    private router : Router,
    private alertctrl: AlertController) { }

  ngOnInit() {
  }
  async signUpUser(){
    this.auth.signup(this.email,this.password).then(
      ()=>{
        this.router.navigateByUrl('getincident')
      },
      async error =>{
        const alert = await this.alertctrl.create({
          message: error.message,
          buttons:[{ text: 'Ok', role: 'cancel'}],
        });
        await alert.present();
      }
    )
  }

}
