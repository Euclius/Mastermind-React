// this function will set the token in the browser
//localStorage is an object that lives in the browser, as is
// setItem and removeItem
// in set item, pass in a key name (what we want it to be named)
// and the value is the second token not in strings

function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}
// get the token from the browser and decode it
// getItem is how pull things from local storage
//checks to make sure token hasn't expired
function getToken() {
    let token = localStorage.getItem('token')
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

// function for removing token
function removeToken () {
localStorage.removeItem('token');
}


function getUserFromToken() {
    // grab the token that is returned from getToken
    const token = getToken();
    // grabbing the user property
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
   // if token is present, return user, if not return null
}


// named export has no default, it would be similar to how controller actions are exported
export {
    setToken,
    getToken,
    getUserFromToken,
    removeToken
}
