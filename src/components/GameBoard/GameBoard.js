import GuessRow from '../GuessRow/GuessRow';
import './GameBoard.css';

const GameBoard = (props) => (
  <div className="GameBoard">
    {props.guesses.map((guess, idx) => 
      <GuessRow 
        guess={guess}
        colors={props.colors}
        rowIdx={idx}
        currentGuess={idx === props.guesses.length - 1}
        handlePegClick={props.handlePegClick}
        handleScoreClick={props.handleScoreClick}
        key={idx}
      />
    )}
  </div>
);

export default GameBoard;

// when mapping through arrays with multiple items, going to need a key