import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Card } from '../models/Card';
import { CARD_CLASSES } from '../models/CardClasses';
import { CARD_RARITIES } from '../models/CardRarities';

import { CardsService } from '../services/cards.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [CardsService]
})

export class ManageComponent implements OnInit {


  constructor(private cardService: CardsService) { }

  // card = this.cards[0];
  card: Card = {
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


  pitchValues = [1, 2, 3];
  selectedPitch = this.card.pitch;

  classValues = CARD_CLASSES;
  selectedClass = this.card.class;

  rarityValues = CARD_RARITIES;
  selectedRarity = this.card.rarity;

  // tag chips
  tags = this.card.tags;
  removable = true;
  addOnBlur = true;
  isAdd: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA];// as const;

  @Input()
  set card_id(id: any) {
    if (id) {
      const body = { card_id: id }
      this.cardService.getCardDataById(body).subscribe(result => {
        this.card = result.data[0];
        this.isAdd = false;
        //  console.log(this.card);
      }, err => {
        console.log(err);
      });
    }
  }

  @Output() tabChange = new EventEmitter<Event>();


  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.card.tags.push(value);
    }
    console.log(value);
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
    // console.log('tags ' + this.card.tags.length);
    // console.log(this.card.id);
    // this.card.id = this.cards.length+1;
    // console.log(this.card.id);
    // console.log('len ' + this.cards.length);

    // this.card.id = this.cards.length+1; 
    // this.cards.push(this.card);
    // this.cardService.saveCards(this.cards)
    if (this.isAdd) {
      this.cardService.addNewCard(this.card).subscribe(result => {
        this.resetCard();
      }, err => {
        console.log(err);
        this.resetCard();
      });
    } else {
      this.cardService.editNewCard(this.card).subscribe(result => {
        this.tabChange.emit();
        this.resetCard();
      }, err => {
        console.log(err);
        this.resetCard();
      });
    }




    console.log('srv ' + this.cardService.cards.length);
    // DEBUG: TODO
    // Save to db via HTTP service (to PHP API?)
  }



}
