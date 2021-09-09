import { Component, OnInit } from '@angular/core';
import { CardService } from '../../service/card.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css'],
  providers: [CardService]
})
export class ViewCardComponent implements OnInit {
  viewData: any;
  id: any;
  constructor(private cardService: CardService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      if (document.getElementById('nav-cards')) {
        document.getElementById('nav-cards').classList.add('active_nav');
      }
    }, 200);
    this.id = this.route.snapshot.params['id'];
    const body = { card_id: this.id }
    this.cardService.getCardInfoById(body).subscribe(result => {
      this.viewData = result.data[0];
    }, err => {
    });
  }

}
