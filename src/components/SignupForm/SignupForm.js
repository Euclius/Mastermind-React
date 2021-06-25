import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../services/userService'

function SignupForm (props) {

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  });

  // this functions allows typing to occur in the signup page
  function handleChange(e) {
    props.updateMessage('');
    setFormState(prevState => ({
      // Using ES2015 Computed Property Names
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit (e) {
    e.preventDefault();
    // prevents the reload 
    try {
      await signup(formState);
      // Successfully signed up - show GamePage('/')
      // behind the scenes, this what link tags are doing
      //handleSignUp is defined in app.js
      props.handleSignupORLogin();
      props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      props.updateMessage(err.message);
    }
  }

  // function for making sure all the information is inputted/ everything is required/ and if these requirements aren't met, then the button will be disabled
  function isFormInvalid() {
    return !(formState.name && formState.email && formState.password === formState.passwordConf);
  }
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Name" value={formState.name} name="name" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={formState.email} name="email" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={formState.password} name="password" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Confirm Password" value={formState.passwordConf} name="passwordConf" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" disabled={isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
}

export default SignupForm;
