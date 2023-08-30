import {ICard} from "./Models.ts";
import {GameActionKind} from "./reducer.ts";


export interface CardProps {
    card: ICard
    dispatch: (card: ICard, type: GameActionKind) => void
}

export function CardComponent(props: CardProps) {
    const { card, dispatch } = props;
    const { color, index, isTurned } = card;

    return (<>
        <button className={isTurned ? color : "gray"} onClick={() => dispatch(card, GameActionKind.TURNCARD)} >{index}</button>
    </>)
}
