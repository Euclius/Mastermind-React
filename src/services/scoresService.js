//whenever highscores is requested, send token along with it
import { getToken } from "./tokenService";
// local constant for holding the url to the api
// updated the base_url to the heroku one after deploying
// the only bit kept from the locahost:3001/scores/api, is the /api
//const BASE_URL = 'https://react-mastermind-backend.herokuapp.com/api'
const BASE_URL = 'http://localhost:3001/api/scores/'

// named export of function for making AJAX request
// when you fetch, it is a two step process, 1st it connects and 
// gets header and setup information then another function is needed, 
// the json, to get the actual body
export function fetchScoreData() {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  };
    return fetch(BASE_URL, options).then(res => res.json());
}

// next this file needs to be imported as well as useEffect. useEffect is
// the proper  place to put an ajax request in a react app


// this function is for adding the score data from a finished game to publis
// addded authorization header after login was coded
export function addScoreData(score) {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      body: JSON.stringify(score)
    };
    return fetch(BASE_URL + '', options).then(res => res.json());
}

