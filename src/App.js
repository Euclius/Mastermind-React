// Add an import statement for the useState hook using the "named import" syntax
import { useState } from "react";

import './App.css';


import GamePage from './pages/GamePage/GamePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import InstructionsPage from './pages/InstructionsPage/InstructionsPage';

import { Route, Switch } from 'react-router-dom';


// if path is not exact, then show a 404 not found. very basic; only called by the componnent parameter given to us by Route from react-router-dom
function NotFound() {
  return <h1> 404 Not Found </h1>
}


function App() {

  const colors = {
    Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
    Moderate: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D966'],
    Hard: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D966', '#555E7B']
  };

  // this sets up the variable selColorIdx and a function called setColorIdx
  const [selColorIdx, setColorIdx] = useState(0);

  const [gameState, setGameState] = useState(getInitialState());


  /* helper functions */

  function genCode(numColors) {
    return new Array(4).fill().map(() => Math.floor(Math.random() * numColors));
  }



  function getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }




  function getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = gameState.guesses.length - 1;
    return gameState.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }





  const winTries = getWinTries();
  //why is there a constant that equals the function?
  // so the number of tries is posted and saves the previous entry so the user can see what they've done before





  // function for a brand new game, next is to attach/make into a button
  // adding a timer, so need a variable to measure how much time has passed in seconds as well as
  // a piece of state for setting a variable for boolean operations
  function getInitialState(numColors = 4, difficulty = 'Easy') {
    return {
      guesses: [getNewGuess()],
      code: genCode(numColors),
      difficulty,
      elapsedTime: 0,
      isTiming: true
    }
  }




  // function to make the new game function be able to be attached to a button

  function handleNewGameClick() {
    setGameState(getInitialState())
  }

  // function for selecting the level by computing the number of colours based on
  // level and initializing a new game wth a new level and a new number of colours
  // for generating a new secret code (answer code)

  function handleDifficultyChange(level) {
    const numColors = colors[level].length;
    setGameState(getInitialState(numColors, level))
  }


  // function for handling the timer
  // after doing this, need to require it as props for the gamepage, then to the gametimer, then the GameTimer can be worked on further
  function handleTimerUpdate() {
    // the useState gives an alternate pattern for setting state using previous state
    // with this syntax, are passing a callback into the setter function
    setGameState(prevGameState => ({
      // setGameState will receive the previous state as if it's an argument
      ...prevGameState,
      // then unpack the previous state with the spread operator syntax and update only what is needed
      elapsedTime: prevGameState.elapsedTime + 1
      // so only elapsed time gets updated
    }))

  }



  // this function handles clicking the colour and then clicking the guess peg
  function handlePegClick(pegIdx) {
    // makes a copy of gamestate
    const gameStateCopy = { ...gameState }

    // gets current guess index
    const currentGuessIdx = gameStateCopy.guesses.length - 1

    //sets the current guesses/ code to selColIdx
    gameStateCopy.guesses[currentGuessIdx].code[pegIdx] = selColorIdx

    //sets state to the new version
    setGameState(gameStateCopy);
  }





  function handleScoreClick() {
    // same process as before with pegclick, these actions need to occur simultaneously. this function changes state in several
    //different ways because score needs to be computed for P, I, and A,
    // needs to make comparisons against the secret code

    // make a variable a copy of the state
    const gameStateCopy = { ...gameState }

    //get current guess index (shortcut variable to be used later)
    const currentGuessIdx = gameStateCopy.guesses.length - 1

    // another shortcut variable that makes a reference to current guess in gameState copy
    const currentGuess = gameState.guesses[currentGuessIdx]

    // creates "working" copies of the "guessed" code and the secret code so that
    // they can be modified as computing the number of perfect and almost without
    // messing up the actual ones in stateCopy
    // before doing anything, a space for computing needs to be made and this is what that is

    const guessCodeCopy = [...currentGuess.code]
    const secretCodeCopy = [...gameStateCopy.code]

    let perfect = 0, almost = 0

    // first pass computes number of "perfect" guesses
    guessCodeCopy.forEach((code, idx) => {
      if (secretCodeCopy[idx] === code) {
        perfect++;
        //ensures the same choice is not matched again
        // by updating both elements in the "working"
        // arrays to null
        guessCodeCopy[idx] = secretCodeCopy[idx] = null;
      }
    })

    // the second pass computes the "almost" guesses
    // indexOf checks the position in the array (i think), but in this case if any colours match with the secret code but aren't in  the right spot
    guessCodeCopy.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        // ensure that the same choice is not matched again in the array; after being found once, it is done
        secretCodeCopy[foundIdx] = null;
      }
    });

    // updates the current guess score using the reference variable currentGuess, which
    // shows the copy of the array of guesses
    currentGuess.score.perfect = perfect;
    currentGuess.score.almost = almost;

    // if the game isn't finished, adds a new guess, not a winner yet
    if (perfect !== 4) gameStateCopy.guesses.push(getNewGuess())

    // then update state to the updated version
    setGameState(gameStateCopy)

  }


  // App js used to contain all of what GamePage had, including the imports whose
  // paths had to be changed because of the move and refactoring the code is a must
  // with GamePage need to give it the props we already defined on this page
  // like winTries, colors, guesses, sel/set coloridx, handle/newgame/scoreclick/pegclick
  // in the gamepage file, they needed to be referenced with .props because it was
  //just a copy and paste type of move

  // if the route in the url were localhost:3000/poopers
  // having route be <Route  path="/" will make it so that the browser will still show everything because technically the homepath "/" is included in the url at the very beginning
  // having route be <Route exact path="/" will make it so that only the header before the Route tag shows because /poopers is not "/" so it will not show unless the path is exactly "/" and if I did a route  exact path "/poopers" it would have to be exactly that
  // this is not toggling, that will be more of the switch component

  // the switch component should wrap around the routes and it is looking for a match of urls that we have listed and if there is not a match, it allows to show something else

  return (
    <div className="App">
      <header className="header-footer">R E A C T &nbsp;&nbsp;&nbsp;&nbsp;M A S T E R M I N D</header>
      <Switch>
        <Route exact path="/" render={() =>
          <GamePage
            winTries={winTries}
            selColorIdx={selColorIdx}
            colors={colors[gameState.difficulty]}
            guesses={gameState.guesses}
            elapsedTime={gameState.elapsedTime}
            isTiming={gameState.isTiming}
            setColorIdx={setColorIdx}
            handleNewGameClick={handleNewGameClick}
            handlePegClick={handlePegClick}
            handleScoreClick={handleScoreClick}
            handleTimerUpdate={handleTimerUpdate}

          />
        } />
        <Route exact path="/settings" render={props =>
          <SettingsPage
            {...props}
            colorsLookup={colors}
            difficulty={gameState.difficulty}
            handleDifficultyChange={handleDifficultyChange}
          />
        } />
        <Route exact path="/instructions" render={() =>
          <InstructionsPage />
        } />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;