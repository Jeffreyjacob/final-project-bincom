import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IncomingHttpHeaders } from 'http';
import { IncidentServiceService } from 'src/app/services/incident-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-post',
  templateUrl: './get-all-post.page.html',
  styleUrls: ['./get-all-post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GetAllPostPage implements OnInit {

  constructor(private postServe: IncidentServiceService,private router: Router) { }
  postData: any 
  ngOnInit() {
    this.getData()
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
