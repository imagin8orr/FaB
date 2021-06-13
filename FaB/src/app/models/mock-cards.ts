import { Component } from '@angular/core';
//import * as Math from 'mathjs';

import { Card } from './Card';

import { CARD_CLASSES  } from '../models/CardClasses';
import { CARD_RARITIES  } from '../models/CardRarities';
import { CARD_TYPES  } from '../models/CardTypes';


export const CARDS: Card[] = [
    {
        id: 1,
        // type: CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)] + " (rnd)", //'Sword',
        type: 'Weapon',
        set: 'Ninja Weapon',
        rarity: CARD_RARITIES[Math.floor(Math.random() * CARD_RARITIES.length)] + " (rnd)", // 'Tournament Prize',
        name: 'Edge of Autumn',
        // class: CARD_CLASSES[Math.floor(Math.random() * CARD_CLASSES.length)] + " (rnd)", 
        class: 'Ninja',
        // class: ['Promo', 'Generic', 'Ninja', 'Warrior', 'Light Warrior', 'Brute', 'Shadow Brute', 'Guardian', 'Ranger', 'Runeblade', 'Shadow RB', 'Mech', 'Wizard', 'Illusionist', 'Light Illusionist', 'Light', 'Shadow', 'Misc'],
    
        pic: 'https://fabdb2.imgix.net/cards/printings/CRU050.png', //https://storage.googleapis.com/fabmaster/media/images/IRA002-P_03Jc6pa.width-300.png',
        tags: ['katana', 'shinken', 'iaito'],
    
        attack: 1,
        bonus_attack: 2,
        block: 3,
        bonus_block: 4,
        pitch: 2,        
        cost: 1,
    },
    {
        id: 2,
        type: 'Hero - Young',
        set: 'MySet2',
        rarity: 'Rare',
        name: 'Benji, the Piercing Wind',
        class: 'Ninja',
    
        cost: 2.99,
        pic: 'https://fabdb2.imgix.net/cards/printings/CRU047.png',
        tags: ['+1', 'attack', 'hero', 'nodefend'],
    
        attack: 5,
        bonus_attack: 6,
        block: 7,
        bonus_block: 8,
        pitch: 3,        
    },
    {
        id: 3,
        type: 'Token',
        set: 'MySet2',
        rarity: 'Rare',
        name: 'Zen State',
        class: 'Ninja',
    
        cost: 2.99,
        pic: 'https://fabdb2.imgix.net/cards/printings/CRU075.png',
        tags: ['token', 'balance', 'prevent', 'destroy'],
    
        attack: 5,
        bonus_attack: 6,
        block: 7,
        bonus_block: 8,
        pitch: 3,        
    },    
    {
        id: 4,
        type: 'Equipment - Legs',
        set: 'MySet2',
        rarity: 'Rare',
        name: 'Breeze Rider Boots',
        class: 'Ninja',
    
        cost: 2.99,
        pic: 'https://fabdb2.imgix.net/cards/printings/CRU053.png',
        tags: ['attack', 'combo', 'battleworn', 'counter'],
    
        attack: 5,
        bonus_attack: 6,
        block: 7,
        bonus_block: 8,
        pitch: 3,        
    },    
    {
        id: 5,
        type: 'Attack',
        set: 'MySet2',
        rarity: 'Rare',
        name: 'Salt the Wound',
        class: 'Ninja',
    
        cost: 2.99,
        pic: 'https://fabdb2.imgix.net/cards/printings/CRU073.png',
        tags: ['+1', 'attack'],
    
        attack: 5,
        bonus_attack: 6,
        block: 7,
        bonus_block: 8,
        pitch: 3,        
    },
]
