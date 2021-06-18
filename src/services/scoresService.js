// local constant for holding the url to the api
const BASE_URL = 'http://localhost:3001/api/'

// named export of function for making AJAX request
// when you fetch, it is a two step process, 1st it connects and 
// gets header and setup information then another function is needed, 
// the json, to get the actual body
export function fetchScoreData() {
    return fetch(BASE_URL + 'scores').then(res => res.json());
}

// next this file needs to be imported as well as useEffect. useEffect is
// the proper  place to put an ajax request in a react app