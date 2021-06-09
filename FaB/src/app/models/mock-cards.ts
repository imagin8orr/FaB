import { Component } from '@angular/core';
//import * as Math from 'mathjs';

import { Card } from './Card';

import { CARD_CLASSES  } from '../models/CardClasses';
import { CARD_RARITIES  } from '../models/CardRarities';
import { CARD_TYPES  } from '../models/CardTypes';


export const CARDS: Card[] = [
    {
        id: 1,
        type: CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)], //'Sword',
        set: 'Ninja Weapon',
        rarity: CARD_RARITIES[Math.floor(Math.random() * CARD_RARITIES.length)], // 'Tournament Prize',
        name: 'Edge of Autumn',
        class: CARD_CLASSES[Math.floor(Math.random() * CARD_CLASSES.length)], // 'Ninja',
        // class: ['Promo', 'Generic', 'Ninja', 'Warrior', 'Light Warrior', 'Brute', 'Shadow Brute', 'Guardian', 'Ranger', 'Runeblade', 'Shadow RB', 'Mech', 'Wizard', 'Illusionist', 'Light Illusionist', 'Light', 'Shadow', 'Misc'],
    
        pic: 'https://storage.googleapis.com/fabmaster/media/images/IRA002-P_03Jc6pa.width-300.png',
        tags: ['keywords', 'go', 'here'],
    
        attack: 1,
        bonus_attack: 2,
        block: 3,
        bonus_block: 4,
        pitch: 2,        
        cost: 1,
    },
    {
        id: 2,
        type: 'Water',
        set: 'MySet2',
        rarity: 'Rare',
        name: 'FaBulous Freshwater',
        class: 'Generic',
    
        cost: 2.99,
        pic: 'https://storage.googleapis.com/fabmaster/media/images/IRA002-P_03Jc6pa.width-300.png',//'https://material.angular.io/assets/img/examples/shiba2.jpg',
        tags: ['keywords', 'are', 'here', 'too'],
    
        attack: 5,
        bonus_attack: 6,
        block: 7,
        bonus_block: 8,
        pitch: 3,        
    },
]
