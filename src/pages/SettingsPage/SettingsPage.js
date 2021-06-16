import { Link } from 'react-router-dom'

// setting page component
//explicit return because return statement is inside
const SettingsPage = (props) => {
    
    // for styling a selectedlevel
    const selectedLevelStyle = {
        border: '2px solid #333'
    };

    // function for changing the level/ difficulty
    // props.history is from the react dev tools
    function handleLevelChange(level) {
        props.handleDifficultyChange(level);
        props.history.push('/')
    }

    // defining the shortcut variable colorkeys to equal Colorslookup, a prop passed from app.js equal to {colors}
    // then a shortcut variable for levels to map over colorkeys while taking in the variable of level, then a callback function
    // to a div showing the different levels in a row with the key being level (the variable of the map of Colorkeys
    // then insde that div is a button which allows users to select the difficulty
    // with style being equal to the level object if props.difficulty then the selectedLevelStyle styling will take place or it won't(null)
    // disabled is being passed as being equal to props.difficulty so that if the level is selected, it cannot be selected again
    // the function for handling the level change with the anonymous callback arrow function
    // then a div for showing the dfferent difficulties from the arrow of levels then that array
    // is mapped over with the prop color
const colorKeys = Object.keys(props.colorsLookup)

const levels = colorKeys.map(level => (
    <div 
    className="Settings-level-row" 
    key={level}
    >
        <button 
        className="Settings-level-btn btn btn-default"
        style={level === props.difficulty ? selectedLevelStyle : null}
        disabled={level === props.difficulty}
        onClick={()=> handleLevelChange(level)}
        >
            {level}
        </button>
        <div className="Settings-level-colors">
            {props.colorsLookup[level].map(color =>
                <div 
                className="Settings-color"
                style={{backgroundColor: color}}
                key={color}
                />
                )}
        </div>
    </div>
))

    return (

        <div className="Settings">
            <header className="header-footer">THE SETTING'S DIFFICULTY PAGE</header>
            <div>
                {levels}
            </div>
            <Link
                className="btn btn-default"
                to="/"
            >
                Home
            </Link>
        </div>

    )
}

export default SettingsPage;