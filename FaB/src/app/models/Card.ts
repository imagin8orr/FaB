

export interface Card {
    id: number;
    type: string;
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