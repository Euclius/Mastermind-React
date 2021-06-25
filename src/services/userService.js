import { setToken, getUserFromToken, removeToken } from './tokenService'
//using this one for testing
const BASE_URL = 'http://localhost:3001/api/users/'
// const BASE_URL = 'https://react-mastermind-backend.herokuapp.com/api/'

function signup(user) {
    return fetch(BASE_URL + 'signup', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.ok) return res.json();
            // prevent duplicate email
            throw new Error('This email has been already taken. Please try again.')
        })
        // .then(data => data); // the data is {token: 'string'}, but we want to take the token out
        // parameter destructering; extract data from an object because token is an object in the browser
        // setToken persists the token into the browser
        .then(({ token }) => setToken(token))
}

// write the getuser function here

function getUser() {
    return getUserFromToken();
}

//
function logout() {
    removeToken();
}

// makes an ajax request to the server
//second curly brace is an options object
// post ajax request
// set some headers for which type of information is being transmitted
// the browser has a header constructor
// header has an object of the content type and which type of information is being sent
// the body is actually json, but it currently isn't, so it needs to be stringified
function login(creds) {
    return fetch(BASE_URL + 'login', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(creds)
    })
        // fetch requires a promise, and that is this next bit
        // it could be .then(res => res.json())
        // .json requires a promise too 
        // and that's the token part; that .then doesn't need to be different
        // res.ok is true or false, a 200 response, and if true, return res.json
        // and the throw error bit is if there cannot be a 200 response
        .then(res => {
            // Valid login if we have a status of 2xx (res.ok)
            if (res.ok) return res.json();
            throw new Error('Bad Credentials, loserino!');
          })
          .then(({token}) => setToken(token));
        }



export {
    signup,
    getUser,
    logout,
    login

};