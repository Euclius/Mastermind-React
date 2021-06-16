import { Link } from 'react-router-dom'


//explicit return because return statement is inside
const SettingsPage = (props) => {

    return (

        <div>
            <h1>THE SETTING'S DIFFICULTY PAGE</h1>
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