export interface Deck {
    id: number;
    cards: {card_id:number, name: string, image_url: string}[];
    name: string;
}