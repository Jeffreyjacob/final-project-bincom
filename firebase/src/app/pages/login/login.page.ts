import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  email: any
  password: any
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  
   
  async loginUser(){
    this.authService.login(this.email,this.password).then(
      ()=>{
        this.router.navigateByUrl('get-all-post')
      },
      async error =>{
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons:[{ text: 'Ok', role: 'cancel'}],
        });
        await alert.present();
      }
    )
  }
  signup(){
    this.router.navigateByUrl('sign-up')
  }

}
