const BASE_URL = 'https://react-mastermind-backend.herokuapp.com/api'

function signup(user) {
    return fetch(BASE_URL + 'signup', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body:JSON.stringify(user)
    })
    .then(res => {
        if (res.ok) return res.json();
        // prevent duplicate email
        throw new Error('This email has been already taken. Please try again.')
    })
    .then(data => data);
}

export {
    signup
};