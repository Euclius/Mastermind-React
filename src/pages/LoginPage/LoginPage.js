import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/userService';
import './LoginPage.css'

function LoginPage(props) {
  const [formState, setFormState] = useState({
    email: "",
    pw: ""
  });

  // function for handleChange
  // invoke the formState, then in the
  // arrow function, prevState represents the previous state
  // which is what that bit does, but prevState can be named
  // anything. then spread out the previous state with "..."
  // and with computed property names, like name
  function handleChange(e) {

    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {

      //login function which is in userServices
      await login(formState);
      props.handleSignupORLogin();
      // once logged in, redirect to hopmepage
      props.history.push('/');
    } catch (err) {
      console.log(err)
      // need to use a modal or toast in apps instead of alert
      alert('invalid credentials, loser')

    }
  }

  return (
    <div className="LoginPage">
      <header className="header-footer">Log In</header>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={formState.email}
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={formState.pw}
              name="pw"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn btn-default">Log In</button>&nbsp;&nbsp;
            <Link to='/'>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

