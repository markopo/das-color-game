import {ICard, Color} from "./Models.ts";

// @ts-ignore
import * as shuffle_es6 from "shuffle-es6";


export function initData(): ICard[] {
    const cards: ICard[] = [
        ...getColorCards("red"),
        ...getColorCards("blue"),
        ...getColorCards("green"),
        ...getColorCards("yellow")
    ];

    let index = 1;
    cards.forEach(c => {
        c.index = index;
        index += 1;
    })

    return shuffle_es6.shuffle(cards);
}


function getColorCards(color: Color): ICard[] {
    const cards: ICard[] = [];
    for(let i=0;i<4; i++) {
        cards.push({
            color: color,
            index: -1,
            isTurned: false
        });
    }
    return cards;
}
