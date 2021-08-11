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
  card_id: any;
  currentTabIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    this.card_id = event;
    this.currentTabIndex = 1;
  }

  onTabChanged(event: any) {
    if (event.index != 1) {
      this.card_id = null;
    }
  }

  onSaveEdit(event: any) {
    this.currentTabIndex = 0;
  }

  title = "FaB CMS Main";

}
