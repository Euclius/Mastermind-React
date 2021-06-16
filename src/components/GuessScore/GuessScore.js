import './GuessScores.css';

const GuessScore = ({ score }) => {
  
  let scores = ('P'.repeat(score.perfect) + 'A'.repeat(score.almost) +
    'I'.repeat(4 - score.perfect - score.almost)).split('');
    // .split takes in strings and spits out an array. so
    // in mastermind there are four postitions and if the score is
    // "piai" (because it is all a string), .split() will return ["p", "i", "a", "i"]
    // and now that scores is an array, it can be mapped through (code in return statement)

  return (
    <div className="GuessScores">
      {scores.map((score, idx) => <div key={idx} style={{...baseStyle, ...pegStyles[score]}} />)}
    </div>
  );
}


// object for base styling of score pegs (base styling is common to all pegs), with this, they are circular
const baseStyle = {
  width: 10,
  height: 10,
  margin: 1,
  border: '2px solid',
  borderRadius: '50%'
}

//css property names need to be camel case.
// for width and height, no need to wrap it in strings if nothing else is being modified.
// the border is being modified as solid and 2px so it needs the string and the px.
// because percentages aren't just numbers tjhere's a % sign, it needs strings too

// below is code to make the 
// Perfect guesses = solid black circle
// almost guesses/ correct colour but wrong position = white circle with black outline
//incorrect guesses/ wrong colour and wrong position = light grey circle

const pegStyles = {
  'P': {
    borderColor: 'black',
    backgroundColor: 'black'
  },
  'A': {
    borderColor: 'black',
    backgroundColor: 'white'
  },
  'I': {
    borderColor:'white',
    backgroundColor: 'lightgrey'
  }
};

//

export default GuessScore;
