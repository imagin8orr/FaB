import { Component, OnInit } from '@angular/core';
import { Card } from '../models/Card';

// import { CARDS } from '../models/mock-cards';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = "FaB CMS Main";  

}
