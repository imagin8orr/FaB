export interface Deck {
    id: number;
    card_id: number[];
    title: string;

    rating: [1,2,3,4,5,6,7,8,9,10];
    tags: string[];
    pace: string;
    control: ['aggro', 'fast', 'slow'];
}