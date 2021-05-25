import { Card } from './Card';


export const CARDS: Card[] = [
    {
        id: 1,
        type: 'Swamp',
        set: 'MySet',
        rarity: 'Not Rare one bit',
        name: 'FaBulous Amazing',
    
        cost: 1.99,
        pic: 'https://storage.googleapis.com/fabmaster/media/images/IRA001-P_EUmBrk0.width-300.png',
        tags: ['keywords', 'go', 'here'],
    
        attack: 1,
        bonus_attack: 2,
        block: 3,
        bonus_block: 4,
        pitch: 2,        
    },
    {
        id: 2,
        type: 'Water',
        set: 'MySet2',
        rarity: 'Def Rare tho',
        name: 'FaBulous Freshwater',
    
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
