const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

function saveTokens(accessToken, refreshToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
}

function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
}

function removeTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

function isLoggedIn() {
    return !!getAccessToken();
}

export {saveTokens,getAccessToken,getRefreshToken,removeTokens,isLoggedIn};