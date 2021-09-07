import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem, CdkDragExit } from '@angular/cdk/drag-drop';
import { Deck } from '../../models/Deck';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  isAddMode: boolean;
  id: any;

  path = 'https://fabdb2.imgix.net/cards/printings/CRU072.png';
  text = "Add Name"
  name_required: boolean = false;
  name: string = null;
  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {

    }
  }

  cards = [
    { card_id: 7, name: 'card7', image_url: this.path },
    { card_id: 8, name: 'card8', image_url: this.path },
    { card_id: 9, name: 'card9', image_url: this.path },
    { card_id: 10, name: 'card10', image_url: this.path },
    { card_id: 11, name: 'card11', image_url: this.path },
    { card_id: 12, name: 'card12', image_url: this.path }
  ];

  // decks: Deck[] = [
  //   {
  //     id: 1,
  //     name: 'saasd',
  //     cards: [
  //       { card_id: 1, name: 'card1', image_url: this.path },
  //       { card_id: 2, name: 'card2', image_url: this.path },
  //       { card_id: 3, name: 'card3', image_url: this.path },
  //       { card_id: 4, name: 'card4', image_url: this.path },
  //       { card_id: 5, name: 'card5', image_url: this.path },
  //       { card_id: 6, name: 'card6', image_url: this.path }
  //     ]
  //   }

  // ];
  decks: Deck[] =[];

  new_cards = [];


  drop(event: CdkDragDrop<string[]>) {
    this.new_cards.push(event.previousContainer.data[event.previousIndex]);
    console.log(event.previousContainer.data[event.previousIndex], 'data');
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    console.log(this.new_cards);
  }

  exited(event: CdkDragExit<string>) {
    console.log(event.item.data, 'cdkDropListEntered');
  }

  saveDeck() {
    if (!this.name) {
      this.name_required = true;
    } else {
      this.name_required = false;
    }
    console.log(this.name_required);
  }

  removeItem(index, id) {
    console.log(id);
    this.decks[0].cards.splice(index, 1);

    console.log(this.decks[0].cards);
  }

  addItem(index) {
    this.decks[0].cards.push(this.cards[index])
  }

}
