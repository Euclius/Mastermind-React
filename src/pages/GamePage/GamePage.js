import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import GameTimer from '../../components/GameTimer/GameTimer';
import NewGameButton from '../../components/NewGameButton/NewGameButton';

import { Link } from 'react-router-dom';

// make a component variable
const GamePage = (props) => {
    return (
        <div className="App">
            <div className="flex-h align-flex-end">
                <GameBoard
                    colors={props.colors}
                    guesses={props.guesses}
                    handlePegClick={props.handlePegClick}
                    handleScoreClick={props.handleScoreClick}
                />
                <div className="App-controls">
                    <ColorPicker
                        colors={props.colors}
                        selColorIdx={props.selColorIdx}
                        setColorIdx={props.setColorIdx}
                    />
                    <GameTimer />
                    
                    <Link
                    style={{marginBottom: 10}}
                    className="btn btn-default" 
                    to="/settings"
                    >Difficulty Setting
                    </Link>

                    <Link
                    style={{marginBottom: 10}}
                    to="/instructions"
                    className="btn btn-default"
                    > Instructions
                    </Link>

                    <NewGameButton
                        handleNewGameClick={props.handleNewGameClick}
                    />
                </div>
            </div>
            <footer className="App-header-footer">{props.winTries ? `You Won in ${props.winTries} Guesses!` : 'Good Luck!'}</footer>
        </div>
    )
}

export default GamePage;

// anchor tags only use when you want to send user outside of the app