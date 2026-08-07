const STORAGE_KEY = "credentials";
//TODO:update this database logic
export function loadCredentials() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return JSON.parse(stored);
    
    return [{
        name: "rahul",
        username: "rahul123",
        email: "rahul@gmail.com",
        password: "rahul123",
        dateOfBirth: "12/3/2004"
    }];
}



export function saveCredentials(credentials) {
    let data = loadCredentials();
    data.push(credentials)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}