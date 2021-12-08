import { SinkRepair } from "./SinkRepair.js";
import { fetchRequests } from "./dataAccess.js";
import { mainContainer } from "./dataAccess.js";

mainContainer.addEventListener("stateChanged", (customEvent) => {
    render();
});

const render = () => {
    fetchRequests().then(() => {
        mainContainer.innerHTML = SinkRepair();
    });
};

render();
