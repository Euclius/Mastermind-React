import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import GameTimer from '../../components/GameTimer/GameTimer';
import NewGameButton from '../../components/NewGameButton/NewGameButton';
import NavBar from '../../components/NavBar/NavBar';

import { Link } from 'react-router-dom';

import './GamePage.css'

// make a component variable
const GamePage = (props) => {
    return (
        <div className="Gamepage">
            <NavBar 
            user={props.user}
            handleLogout={props.handleLogout}
            />
            <div className="flex-h align-flex-end">
                <GameBoard
                    colors={props.colors}
                    guesses={props.guesses}
                    handlePegClick={props.handlePegClick}
                    handleScoreClick={props.handleScoreClick}
                />
                <div className="Gamepage-controls">
                    <ColorPicker
                        colors={props.colors}
                        selColorIdx={props.selColorIdx}
                        setColorIdx={props.setColorIdx}
                    />
                    <GameTimer
                        elapsedTime={props.elapsedTime}
                        isTiming={props.isTiming}
                        handleTimerUpdate={props.handleTimerUpdate}
                    />
                    <div>
                        <Link
                            style={{ marginBottom: 10 }}
                            className="btn btn-default"
                            to="/settings"
                        >Difficulty Setting
                        </Link>

                        <Link
                            style={{ marginBottom: 10 }}
                            to="/instructions"
                            className="btn btn-default"
                        > Instructions
                        </Link>

                       { props.user && <Link
                            style={{ marginBottom: 10 }}
                            className="btn btn-default"
                            to="/high-scores">
                            High Scores
                        </Link>}

                        <NewGameButton
                            handleNewGameClick={props.handleNewGameClick}
                        />
                    </div>
                </div>
            </div>
            <footer className="header-footer">{props.winTries ? `You Won in ${props.winTries} Guesses!` : 'Good Luck!'}</footer>
        </div>
    )
}

export default GamePage;

// anchor (<a> href) tags only use when you want to send user outside of the app

/*
                       { props.user && <Link
                            style={{ marginBottom: 10 }}
                            className="btn btn-default"
                            to="/high-scores">
                            High Scores
                        </Link>}
                        by wrapping the link with curly braces  and passing props.user {props.user && <Link
                            this basically says if there is a user, then there is a link
                            if there is no user, then there is no link
*/