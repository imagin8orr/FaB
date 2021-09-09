import { Component, OnInit } from '@angular/core';
import { CardService } from '../../service/card.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CARD_CLASSES } from '../../models/CardClasses';
import { CARD_RARITIES } from '../../models/CardRarities';
import { CARD_TYPES } from '../../models/CardTypes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.css'],
  providers: [CardService]
})
export class AddEditCardComponent implements OnInit {
  isAddMode: boolean;
  id: any;
  submitted = false;
  loading: boolean = false;

  dropdownList = [];
  selectedItems = [];

  AddEditForm: FormGroup;
  dropdownSettings: IDropdownSettings = {};

  items = [];
  cardClasses: any = CARD_CLASSES;
  cardRarities: any = CARD_RARITIES;
  cardTypes:any = CARD_TYPES;

  constructor(private cardService: CardService, private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder, public toastrService: ToastrService) {
    this.createForm();
    this.dropdownSettings = {
      singleSelection: false,
      allowSearchFilter: true
    };
  }


  createForm() {
    this.AddEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      class: ['Brute', Validators.required],
      type: ['', Validators.required],
      set: ['', Validators.required],
      rarity: ['', Validators.required],
      image_url: ['', Validators.required],
      tags: [''],
      pitch: ['1', Validators.required],
      cost: ['', Validators.required],
      attack: ['', Validators.required],
      bonus_attack: ['', Validators.required],
      block: ['', Validators.required],
      bonus_block: ['', Validators.required],
    });
  }

  get f() { return this.AddEditForm.controls; }

  ngOnInit() {
    setTimeout(() => {
      if (document.getElementById('my-cards')) {
        document.getElementById('my-cards').classList.add('active_nav');
      }
    }, 200);
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.loadEditData();
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  loadEditData() {
    const body = { card_id: this.id }
    this.cardService.getCardDataById(body).subscribe(result => {
      this.AddEditForm.setValue({
        name: result.data.name,
        class: result.data.class,
        type: result.data.type,
        set: result.data.card_set,
        rarity: result.data.rarity,
        image_url: result.data.image_url,
        tags: '',
        pitch: result.data.pitch,
        cost: result.data.cost,
        attack: result.data.attack,
        bonus_attack: result.data.bonus_attack,
        block: result.data.block,
        bonus_block: result.data.bonus_block,
      });
      this.items = result.data.tags;

    }, err => {
      this.handelError(err);
    });
  }


  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.AddEditForm.invalid) {
      this.loading = false;
      return;
    }
    console.log(this.AddEditForm.value);
    if (this.isAddMode) {
      this.cardService.addCard(this.AddEditForm.value).subscribe(result => {
        if (result.message) this.toastrService.success(result.message);
        this.router.navigate(['/']);
        //}
      }, err => {
        this.handelError(err);
      });
    } else {
      this.AddEditForm.value['card_id'] = this.id;
      this.cardService.updateCard(this.AddEditForm.value).subscribe(result => {
        if (result.message) this.toastrService.success(result.message);
        this.router.navigate(['/']);
        //}
      }, err => {
        this.handelError(err);
      });
    }

  }


  mobile_number_validation(event: any) {
    const pattern = /[0-9\+()\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  handelError(err) {
    this.loading = false;
    if (err.error.message) this.toastrService.error(err.error.message);
    if (err.status == 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('currentUser');
      window.location.reload();
      this.router.navigate(['/']);
    }
  }

}
