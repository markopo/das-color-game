import './App.css'
import {CardComponent} from "./CardComponent.tsx";
import reducer, { initState, GameActionKind} from "./reducer.ts";
import {useEffect, useReducer, useRef} from "react";
import {ICard} from "./Models.ts";



function App() {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const { score, cards, loading, win } = state;
    const timerRef = useRef<number|null>(null);

    useEffect(() => {

        return () => {
           if(timerRef.current) {
               clearTimeout(timerRef.current);
           }
        };
    }, []);

    function turnCard(card: ICard, type: GameActionKind): void {
        dispatch({
            type: type,
            payload: card,
            score: null
        });
    }

    function newGame(): void {
        dispatch({
          type: GameActionKind.NEWGAME,
          payload: null,
          score: null
        });
    }

     const turnedCards = cards.filter(x => x.isTurned === true);
     const hasTwoCardsTurned = turnedCards.length === 2;

     if(hasTwoCardsTurned && !loading) {

         dispatch({
             type: GameActionKind.ISLOADING,
             payload: null,
             score: null
         });

         timerRef.current = setTimeout(() => {
             const hasTwoSameCards = turnedCards[0].color === turnedCards[1].color;

             dispatch({
                 type: GameActionKind.TURNCARDSDOWN,
                 payload: turnedCards,
                 score: hasTwoSameCards ? score + 1 : (score > 0 ? score - 1 : 0)
             });
         }, 2000);
     }

     if(cards.length == 0 && !loading && !win) {
         dispatch({
             type: GameActionKind.WIN,
             payload: null,
             score: null
         });
     }


      return (
        <div>
          <header>
            <div>
                <h1>Colour Memory</h1>
                <span>Score: {score}</span>
                <button className="normal-btn" onClick={() => newGame()} >Play again!</button>
            </div>
          </header>
          <div className="board">
            {cards.map((c, i) => <CardComponent key={i} card={c} dispatch={turnCard} />)}
          </div>
          {loading && <div className="overlay" />}
          {win && <div className="win-modal">
                     <h4>Congratulations! You won!</h4>
                     <p>Do you want to play again?</p>
                     <button className="normal-btn" onClick={() => newGame()} >Play again!</button>
                  </div>}
        </div>
      );
}

export default App
