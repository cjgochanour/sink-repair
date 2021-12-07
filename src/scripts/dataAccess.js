const API = "http://localhost:8088";

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then((response) => response.json())
        .then((serviceRequests) => {
            // Store the external state in application state
            applicationState.requests = serviceRequests;
        });
};

const applicationState = {
    requests: [],
};

export const getRequests = () => applicationState.requests.map((request) => ({ ...request }));
