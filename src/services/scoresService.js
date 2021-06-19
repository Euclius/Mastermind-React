// local constant for holding the url to the api
// updated the base_url to the heroku one after deploying
// the only bit kept from the locahost:3001/scores/api, is the /api
const BASE_URL = 'https://react-mastermind-backend.herokuapp.com/api'

// named export of function for making AJAX request
// when you fetch, it is a two step process, 1st it connects and 
// gets header and setup information then another function is needed, 
// the json, to get the actual body
export function fetchScoreData() {
    return fetch(BASE_URL + '/scores').then(res => res.json());
}

// next this file needs to be imported as well as useEffect. useEffect is
// the proper  place to put an ajax request in a react app


// this function is for adding the score data from a finished game to publis
export function addScoreData(score) {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(score)
    };
    return fetch(BASE_URL + '/scores', options).then(res => res.json());
}