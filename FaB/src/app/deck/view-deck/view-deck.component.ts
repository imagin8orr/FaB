import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.css']
})
export class ViewDeckComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  cards = [
    { card_id: 7, name: 'card7', image_url: '../assets/img/news/img7.jpg' },
    { card_id: 8, name: 'card8', image_url: '../assets/img/news/img8.jpg' },
    { card_id: 9, name: 'card9', image_url: '../assets/img/news/img9.jpg' },
    { card_id: 10, name: 'card10', image_url: '../assets/img/news/img10.jpg' },
    { card_id: 11, name: 'card11', image_url: '../assets/img/news/img11.jpg' },
    { card_id: 12, name: 'card12', image_url: '../assets/img/news/img12.jpg' }
  ];

  decks = [
    {
      id: 1, cards: [
        { card_id: 1, name: 'card7', image_url: '../assets/img/news/img1.jpg' },
        { card_id: 2, name: 'card8', image_url: '../assets/img/news/img2.jpg' },
        { card_id: 3, name: 'card9', image_url: '../assets/img/news/img3.jpg' },
        { card_id: 4, name: 'card10', image_url: '../assets/img/news/img4.jpg' }
      ]
    },
    {
      id: 1, cards: [
        { card_id: 5, name: 'card11', image_url: '../assets/img/news/img5.jpg' },
        { card_id: 6, name: 'card12', image_url: '../assets/img/news/img6.jpg' }
      ]
    }
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
