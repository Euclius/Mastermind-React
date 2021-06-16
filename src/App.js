// Add an import statement for the useState hook using the "named import" syntax
import { useState } from "react";

import './App.css';


import GamePage from './pages/GamePage/GamePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import InstructionsPage from './pages/InstructionsPage/InstructionsPage';

import { Route, Switch } from 'react-router-dom';

function NotFound() {
  return <h1> 404 Not Found </h1>
}


function App() {
  const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];

  // this sets up the variable selColorIdx and a function called setColorIdx
  const [selColorIdx, setColorIdx] = useState(0);

  const [gameState, setGameState] = useState(getInitialState());


  /* helper functions */

  function genCode() {
    return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
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
  function getInitialState() {
    return {
      guesses: [getNewGuess()],
      code: genCode()
    }
  }





  // function to make the new game function be able to be attached to a button

  function handleNewGameClick() {
    setGameState(getInitialState())
  }




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
      <header className="App-header-footer">R E A C T &nbsp;&nbsp;&nbsp;&nbsp;M A S T E R M I N D</header>
  <Switch>
      <Route exact path="/" render={() => 
    <GamePage 
      winTries={winTries}
      colors={colors}
      selColorIdx={selColorIdx}
      guesses={gameState.guesses}
      setColorIdx={setColorIdx}
      handleNewGameClick={handleNewGameClick}
      handlePegClick={handlePegClick}
      handleScoreClick={handleScoreClick}
    />
      } />
      <Route exact path="/settings" render={() => 
      <SettingsPage/>
      }/>
      <Route exact path="/instructions" render={() => 
      <InstructionsPage/>
      }/>
      <Route component={NotFound} />
  </Switch>
    </div>
  );
}

export default App;