import { deleteRequest, getRequests, mainContainer } from "./dataAccess.js";

mainContainer.addEventListener("click", (click) => {
    if (click.target.id.startsWith("request")) {
        const [, requestId] = click.target.id.split("--");
        deleteRequest(parseInt(requestId));
    }
});

export const Requests = () => {
    const requests = getRequests();

    let html = `
        <ul>
            ${requests.map(
                (requestList) => `<li>
                ${requestList.description}
                <button class="request__delete"
                        id="request--${requestList.id}">
                    Delete
                </button>
            </li>`
            )}
        </ul>
    `;

    return html;
};
