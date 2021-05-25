import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { CardComponent } from '../card/card.component';
import { Card } from '../models/Card';
import { CARDS } from '../models/mock-cards';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageComponent implements OnInit {

  cards = CARDS;
  card = this.cards[0];
  pitchValues = [1,2,3];
  selectedPitch = this.card.pitch;

  selectPitch(event: Event) {
    this.selectedPitch = Number((event.target as HTMLSelectElement).value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
