import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

import { CardComponent } from '../card/card.component';
import { Card } from '../models/Card';
import { CARDS } from '../models/mock-cards';
import { CARD_CLASSES } from '../models/CardClasses';
import { CARD_RARITIES } from '../models/CardRarities';

import { CardsService } from '../services/cards.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageComponent implements OnInit {

  cards = CARDS;
  // card = this.cards[0];
  card: Card =     {
    id: 9999,
    type: 'Weapon',
    set: '',
    rarity: '',
    name: '',
    class: '',

    cost: 0,
    pic: '',
    tags: [],

    attack: 0,
    bonus_attack: 0,
    block: 0,
    bonus_block: 0,
    pitch: 0,        
  } 

   
  pitchValues = [1,2,3];
  selectedPitch = this.card.pitch;

  classValues = CARD_CLASSES;
  selectedClass = this.card.class;

  rarityValues = CARD_RARITIES;
  selectedRarity = this.card.rarity;

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
    this.card.pitch = this.selectedPitch;
  }

  // selectTags(event: Event) {
  //   this.card.tags = new Map((event.target as HTMLSelectElement).value));
  // }


  resetCard(): void {
    this.card = {
      id: 9999,
      type: 'Weapon',
      set: '',
      rarity: '',
      name: '',
      class: '',
  
      cost: 0,
      pic: '',
      tags: [],
  
      attack: 0,
      bonus_attack: 0,
      block: 0,
      bonus_block: 0,
      pitch: 0,        
    } 
  }

  onSave(): void {
    console.log('tags ' + this.card.tags.length);
    console.log(this.card.id);
    this.card.id = this.cards.length+1;
    console.log(this.card.id);
    console.log('len ' + this.cards.length);

    
    // this.card.id = this.cards.length+1; 
    this.cards.push(this.card);
    this.cardService.saveCards(this.cards)
    this.resetCard();

    console.log('srv ' + this.cardService.cards.length);
    // DEBUG: TODO
    // Save to db via HTTP service (to PHP API?)
  }
  

  constructor(private cardService: CardsService) { }

  ngOnInit(): void {
  }

}
