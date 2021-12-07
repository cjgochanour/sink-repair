import { getRequests } from "./dataAccess.js";

export const Requests = () => {
    const requests = getRequests();

    let html = `
        <ul>
            ${requests.map(
                (requestList) => `<li>${requestList.description}
            </li>`
            )}
        </ul>
    `;

    return html;
};
