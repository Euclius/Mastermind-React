import { useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css'
//sign up form is taking the props because of {...props}
// so we don't need to require handleSignUp in it
function SignupPage(props) {

    // hook for setting state
    const [messageState, setMessageState] = useState({
        msg: ''
    });


    function updateMessage(msg) {
        setMessageState({message: msg});
    }
    return (
        <div className='SignupPage'>
            <SignupForm {...props} updateMessage={updateMessage} />
            <p>{messageState.msg}</p>
        </div>
    )
}

export default SignupPage;