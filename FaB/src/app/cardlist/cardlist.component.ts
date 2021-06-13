import { Component, OnInit, Input } from '@angular/core';
import { Card  } from '../models/Card';
import { CARDS } from '../models/mock-cards';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {

  @Input() card?: Card;

  cards = CARDS;

  constructor() { }

  ngOnInit(): void {
  }

}
