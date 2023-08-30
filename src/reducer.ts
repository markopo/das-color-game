import {ICard} from "./Models.ts";
import {initData} from "./Data.ts";


export interface ColourGameState {
    score: number;
    loading: boolean;
    cards: ICard[];
    win: boolean;
}

export enum GameActionKind {
    TURNCARD,
    TURNCARDSDOWN,
    ISLOADING,
    NOTLOADING,
    NEWGAME,
    WIN,
}

export interface GameAction {
    type: GameActionKind,
    payload: ICard|null|ICard[]
    score: number|null
}

export const initState: ColourGameState = {
    score: 0,
    loading: false,
    win: false,
    cards: initData()
}

export default function (state: ColourGameState, action: GameAction): ColourGameState {
    const { type, payload } = action;
    switch (type) {
        case GameActionKind.TURNCARD:
            const turnedCard = payload as ICard;
            const findIndex = state.cards.findIndex(c => c.index === turnedCard?.index);

            return {
                ...state,
               cards: [...state.cards.slice(0, findIndex),
                       {
                        ...state.cards[findIndex],
                        isTurned: !turnedCard.isTurned
                        },
                      ...state.cards.slice(findIndex + 1)]
            };
        case GameActionKind.TURNCARDSDOWN:
            let mutCards = state.cards.slice(0);

            mutCards.forEach(x => {
                x.isTurned = false;
            });

            const turnedCards = payload as ICard[];
            const hasTwoSameCards = turnedCards[0].color === turnedCards[1].color;
            const score = action.score;

            if(hasTwoSameCards) {
                mutCards = mutCards
                    .filter(x => x.index !== turnedCards[0].index &&
                        x.index !== turnedCards[1].index);
            }

            return {
                ...state,
                cards: mutCards,
                score: score,
                loading: false
            };
        case GameActionKind.ISLOADING:
            return {
                ...state,
                loading: true,
            };
        case GameActionKind.NOTLOADING:
            return {
                ...state,
                loading: false
            }
        case GameActionKind.NEWGAME:
            return initState;
        case GameActionKind.WIN:
            return {
                ...state,
                win: true
            }
        default:
            return state;

    }
}
