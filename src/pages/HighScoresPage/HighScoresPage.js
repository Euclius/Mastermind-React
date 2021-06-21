import { Link } from 'react-router-dom';
import { formatTime } from '../../services/utilities'
import styles from './HighScoresPage.module.css';

function HighScoresPage(props) {
    const scoreRows = props.scores.map((score, idx) => (
        <tr key={idx}>
            <td><span className="badge">{idx + 1}</span></td>
            <td>{score.initials}</td>
            <td>{score.numGuesses}</td>
            <td>{formatTime(score.seconds)}</td>
        </tr>
    ));


return (
    <div className ={styles.HighScores}>
        <header className='header-footer'>High Scores</header>
        {props.scores.length ?
            <table className={`${styles.table} table text-info`}>
                <thead>
                    <tr>
                        <th width={80}>Rank #</th>
                        <th width={100}>Initials</th>
                        <th width={100}>Guesses</th>
                        <th>Seconds</th>
                    </tr>
                </thead>
                <tbody>
                    {scoreRows}
                </tbody>
            </table>
            :
            <h4 className='text-info'>No High Scores Yet</h4>
        }
        <div>
            <Link className= 'btn btn-default' to='/'>Back to Game</Link>
        </div>
    </div>
)
    }

    export default HighScoresPage;