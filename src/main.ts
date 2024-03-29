// import debounce from "./debounce";
import "./style.css";
import park from "./parks";
import activities from "./activities";
import { fetchEndpoint, activiesEndpoint } from "./api";
import { setupRefreshForm } from "./form";

const url = new URL(window.location.href);
const parkId = url.pathname.split("/").pop();

let maxStartValue = 0;

export function getMaxStartValue(): number {
  return maxStartValue;
}

export function updateMaxStartValue(value: number) {
  if(value > maxStartValue) {
    maxStartValue = value;
  }
}

(async function () {
  // If the end of the url ends in the id of a park, then we want to show that parks data in the table
  await (async () => {
    if (parkId) {
      $('.show-parks').removeClass('show-parks');
      const { data } = await fetchEndpoint(`${activiesEndpoint}?id=${parkId}`);
      park(data[0].parks);
    } else {
      $('.show-activities').removeClass('show-activities');
      const { data } = await fetchEndpoint(activiesEndpoint);
      maxStartValue = data.length
      activities(data);
    }
  })();
  await setupRefreshForm();
})();
