import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'

function LoginPage(props) {
    const [formState, setFormState] = useState({
        email: "",
        pw: ""
    });

    function handleChange(e) {
        // todo, function for handleChange
        // check to see how if correct later
        setFormState(prevState => ({
            ...prevState,
            [e.target.email]: e.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            //todo write handlesubmit function

        } catch(err) {
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
    
