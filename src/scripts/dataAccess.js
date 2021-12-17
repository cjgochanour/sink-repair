const API = "sink-repair-dev22.us-east-1.elasticbeanstalk.com";
export const mainContainer = document.querySelector("#container");

// if the request id is found in the completions id, put it last

const applicationState = {
    requests: [],
    plumbers: [],
    completions: [],
};

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then((response) => response.json())
        .then((serviceRequests) => {
            // Store the external state in application state
            applicationState.requests = serviceRequests;
        });
};

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then((res) => res.json())
        .then((res) => {
            applicationState.plumbers = res;
        });
};

export const getPlumberes = () => applicationState.plumbers.map((plumber) => ({ ...plumber }));

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() =>
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    );
};

export const getRequests = () => {
    const newArray = applicationState.requests.map((request) => ({ ...request }));
    newArray.sort((a, b) => {
        return a.isComplete - b.isComplete;
    });
    return newArray;
};

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userServiceRequest),
    };

    return fetch(`${API}/requests`, fetchOptions)
        .then((response) => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        });
};

export const saveCompletion = (completion) => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completion),
    };
    const patchOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isComplete: true,
        }),
    };
    return fetch(`${API}/completions`, postOptions)
        .then((res) => res.json())
        .then((toSet) =>
            fetch(`${API}/requests/${toSet.requestId}`, patchOptions).then(() =>
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            )
        );
};

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then((res) => res.json())
        .then((com) => (applicationState.completions = com));
};
