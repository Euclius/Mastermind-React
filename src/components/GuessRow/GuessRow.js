import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
import ScoreButton from '../ScoreButton/ScoreButton';
import styles from '../GuessRow/GuessRow.module.css'

const GuessRow = (props) => (
  <div className={styles.GuessRow}>
    <div
      className={styles.rowNum}
      style={{ color: props.currentGuess ? 'black' : 'lightgrey' }}
    >
      {props.rowIdx + 1}
    </div>
    <GuessPegs
      colors={props.colors}
      code={props.guess.code}
      currentGuess={props.currentGuess}
      handlePegClick={props.handlePegClick}
    />
    {
      props.currentGuess && props.guess.score.perfect !== 4 
        ? <ScoreButton 
        disabled={props.guess.code.includes(null)}
        handleScoreClick = {props.handleScoreClick}
        />
        : <GuessScore score={props.guess.score} />
    }
  </div>
);

export default GuessRow;

// the props.currentGuess ternary functon could be written as an if-else statement
// if(props.currentGuess) {
//  <ScoreButton /> 
// } else {
// <GuessScore score={props.guess.score}  
// }
// but for jsx, it needs to be one line and this is multiple because of the curly braces
// to do it without the ternary, would have to make this a function and call on that function, defined elsewhere, so it'd have to be imported also

//rowIdx is passed through from Gameboard