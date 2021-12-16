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
            requestId: parseInt(requestId),
            plumberId: parseInt(plumberId),
            date: dateInt.toLocaleString(),
        };
        saveCompletion(completion);
    }
});

export const Requests = () => {
    const requests = getRequests();
    const plumbers = getPlumberes();
    const completeCheck = (y) => {
        if (y.isComplete) {
            return `class="isComplete"`;
        } else {
            return `class="incomplete"`;
        }
    };
    const optionsCheck = (z) => {
        if (!z.isComplete) {
            return `<select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${plumbers
                .map((plumber) => {
                    return `<option value="${z.id}--${plumber.id}">${plumber.name}</option>`;
                })
                .join("")}
        </select>`;
        } else {
            return "";
        }
    };

    const convertRequestToListElement = (x) => `<li ${completeCheck(x)}>
    ${x.description}
    ${optionsCheck(x)}
    <button class="request__delete"
            id="request--${x.id}">
        Delete
    </button>
</li>`;

    let html = `
        <ul>
            ${requests.map((request) => convertRequestToListElement(request)).join("")}
        </ul>
    `;

    return html;
};
