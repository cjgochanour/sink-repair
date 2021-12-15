import { deleteRequest, getRequests, mainContainer, getPlumberes, saveCompletion } from "./dataAccess.js";

mainContainer.addEventListener("click", (click) => {
    if (click.target.id.startsWith("request")) {
        const [, requestId] = click.target.id.split("--");
        deleteRequest(parseInt(requestId));
    }
});

mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "plumbers") {
        const [requestId, plumberId] = event.target.value.split("--");
        const dateInt = new Date(Date.now());
        const completion = {
            requestId,
            plumberId,
            date: dateInt.toLocaleString(),
        };
        saveCompletion(completion);
    }
});

export const Requests = () => {
    const requests = getRequests();
    const plumbers = getPlumberes();
    const convertRequestToListElement = (x) => `<li>
    ${x.description}
    <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${plumbers
            .map((plumber) => {
                return `<option value="${x.id}--${plumber.id}">${plumber.name}</option>`;
            })
            .join("")}
    </select>
    <button class="request__delete"
            id="request--${x.id}">
        Delete
    </button>
</li>`;

    let html = `
        <ul>
            ${requests.map((request) => convertRequestToListElement(request))}
        </ul>
    `;

    return html;
};
