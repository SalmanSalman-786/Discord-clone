const API_BASE_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, method = "GET", body = null, token = null) {

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    const data = await response.json();

    return {
        status: response.status,
        ok: response.ok,
        data
    };

}