import { Link } from 'react-router-dom'

const InstructionsPage = (props) => {

    return (

    
    <div>
        <header>
            Instructions for how to play:
        </header>
        <p>
        Your goal is to match all the colours to their correct positions.  
        The black circles inform you that you have a correct colour in the correct position.
        The white circles indicate you have a correct colour but it is in the wrong position.
        The grey circles tell you that neither colour nor position is accurate.
        Select the colour, blue, yellow, purple, or red and then click in one of the four dashed-border circles.
        Once all four colours have been placed, click the checkmark box to check and see if you
        matched colour and position or just colour or neither.
        </p>
        <Link
        to="/"
        className="btn btn-default"
        >
        Home
        </Link>
    </div>
    )
}

export default InstructionsPage;