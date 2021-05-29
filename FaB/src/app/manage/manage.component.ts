import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { CardComponent } from '../card/card.component';
import { Card } from '../models/Card';
import { CARDS } from '../models/mock-cards';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


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

  classValues = ['Brute', 'Generic', 'Guardian', 'Illusionist', 'Light', 'Light Illusionist', 'Light Warrior', 'Mech', 'Misc', 'Ninja', 'Promo', 'Ranger', 
                 'Runeblade', 'Shadow', 'Shadow Brute', 'Shadow Runeblade', 'Warrior', 'Wizard']
  selectedClass = this.card.class;

  // tag chips
  tags = this.card.tags;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA];// as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.card.tags.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
    event.input.value = "";
  }

  remove(tag: string): void {
    const index = this.card.tags.indexOf(tag);

    if (index >= 0) {
      this.card.tags.splice(index, 1);
    }
  }

  selectPitch(event: Event) {
    this.selectedPitch = Number((event.target as HTMLSelectElement).value);
  }

  

  constructor() { }

  ngOnInit(): void {
  }

}
