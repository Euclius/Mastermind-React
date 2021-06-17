import styles from './GameTimer.module.css'
import { formatTime } from '../../services/utilities'
import { useEffect, useRef } from 'react';

const GameTimer = (props) => {

// initializes useRef as mutable reference/ variable
const callbackRef = useRef()


// helper function
function handleTick() {
  props.handleTimerUpdate();
}



useEffect(() => {
  // update the mutable reference to the latest version of handletick
  // whenever the component re-renders
  callbackRef.current = handleTick;
});
//unlike with the other useEffect, there is no need 
// for a dependency array and this effect will take place on each render




//set up useEffect hook to set the interval when the componenet is mounted
useEffect(() => {
  //creates the timer
  // calls the setInterval function passing in the handleTick callback and time delay value
  const timerId = setInterval(callbackRef.current, 1000)  
  // the useEffect callback also returns a cleanup function
  // that can be used to invoke the cleanup behaviour; clears timer memory
  return () => clearInterval(timerId)
}, []);

  // empty dependency array to prevent side effect from running on every re-render after updating state
  // where it says callbackRef.current, it used to say handleTick, but we need to use useRef to do it
  // and even though it does not say handletick, it is, and because of the useRef in the other useEffect
  // there are no dependency errors when the app is compiled
  


return (
  <div className={styles.GameTimer}>
    {formatTime(props.elapsedTime)}
  </div>
)

}

export default GameTimer;




// to make the gameTime work, refactored the gametimer component from an implicit return syntax to the explicit return syntax
// below is the implicit return syntax. the visual difference if after the arrow function, implicit is
// parenthesis and explicit are curly braces

//const GameTimer = (props) => (
//  <div className={styles.GameTimer}>
//    {formatTime(props.elapsedTime)}
//  </div>
//);

/* 
Let's evaluate what's happening in React:

GameTimer mounts and useEffect runs our handleTick helper function on a 1 second delay interval.
handleTick calls props.handleTimerUpdate, which updates our gameState.elapsedTime to gameState.elapsedTime + 1
State was changed, so React re-renders the components.
<GameTimer> was re-rendered and even though our setInterval timer remembers 
which function it should call back to ... (handleTick), 
the useEffect hook does not remember anything from the previous render, including the previous "version" of handleTick 
from the previous render. This results in some really odd behavior such as useEffect 
telling us that handleTick should be marked as a dependency and added to the dependency array.
So, in other words, a new handleTick function is created every time <GameTimer> is re-rendered 
but setInterval is still calling the original callback from the first render 🤯. This might seem 
very confusing ... because it is 🤣.., and you're probably wondering why this is so important as our 
timer seems to be working perfectly fine. There's a lot to unpack here, and for the record, this 
strange behavior is by design. This issue has a lot to do with the declarative programming model of 
React clashing with the imperative programming model of setInterval. Fortunately, this anomaly is 
well explained by one of the most highly regarded experts on the React team, 
Dan Abramov. He explains all of this and more in his article titled "Making setInterval Declarative with React Hooks".

In the article, Dan recommends solving this problem by creating a mutable reference to 
ourhandleTick function with the useRef hook. We can dynamically update this reference to the 
latest version of handleTick each time the component re-renders.

The secret sauce to useRef is that it gives us a mutable reference we can persist between renders, 
which is the perfect tool for addressing this issue.

We'll also need another side effect to handle the dynamic updating of the reference between 
renders; we'll accomplish this using another call to the useEffect hook.

*/
