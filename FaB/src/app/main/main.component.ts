import { Component, OnInit } from '@angular/core';
// import { Card } from '../models/Card';
// import { ManageComponent } from '../manage/manage.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  // manager = new ManageComponent();

  constructor() { }

  ngOnInit(): void {
  }

  title = "FaB CMS Main";  

}
