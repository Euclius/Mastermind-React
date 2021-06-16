import GuessPeg from '../GuessPeg/GuessPeg';
import './GuessPegs.css';

const GuessPegs = (props) => (
  <div className="GuessPegs">
    <GuessPeg 
    currentGuess={props.currentGuess} 
    color={props.colors[props.code[0]]}
    handlePegClick={()=> props.handlePegClick(0)}
    />
    <GuessPeg 
    currentGuess={props.currentGuess} 
    color={props.colors[props.code[1]]}
    handlePegClick={()=> props.handlePegClick(1)}
    />
    <GuessPeg 
    currentGuess={props.currentGuess} 
    color={props.colors[props.code[2]]}
    handlePegClick={()=> props.handlePegClick(2)}
    />
    <GuessPeg 
    currentGuess={props.currentGuess} 
    color={props.colors[props.code[3]]}
    handlePegClick={()=> props.handlePegClick(3)}
    />
  </div>
);

export default GuessPegs;

// currentGuess computes to true or false, not because of this code, but just for a reminder