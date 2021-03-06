export interface Card {
    card_id: number;
    type: string;
    class: string;
    set: string;    // alphanumeric
    rarity: string;
    name: string;

    cost: number;
    pic: string;    //URL
    tags: string[]; //keywords

    attack: number; 
    bonus_attack: number;   // +/-
    block: number;  
    bonus_block: number;  // +/-
    pitch: number;  // 1,2,3

}