import { SinkRepair } from "./SinkRepair.js";
import { fetchRequests, fetchPlumbers, fetchCompletions } from "./dataAccess.js";
import { mainContainer } from "./dataAccess.js";

mainContainer.addEventListener("stateChanged", (customEvent) => {
    render();
});

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(() => {
            mainContainer.innerHTML = SinkRepair();
        });
};

render();
