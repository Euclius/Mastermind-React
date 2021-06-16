const NewGameButton = (props) => (
  <button className="btn btn-default"
  onClick={props.handleNewGameClick}>
    New Game
  </button>
);

export default NewGameButton;

// because arguments are not being passed (doesn't need any) just needs a reference function
//not a functions that invokes

