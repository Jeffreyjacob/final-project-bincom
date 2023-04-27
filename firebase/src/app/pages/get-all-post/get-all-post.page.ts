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

  ngOnInit() {
 
  }
  
}
