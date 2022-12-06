// import debounce from "./debounce";
import "./style.css";
import park from "./park";
import activities from "./activities";
import { fetchEndpoint, activiesEndpoint } from "./api";

(async function () {

  // If the end of the url ends in the id of a park, then we want to show that parks data in the table

  const url = new URL(window.location.href);
  const parkId = url.pathname.split('/').pop();

  const { data } = await (async () => {
    if(parkId) {
      return await fetchEndpoint(`${activiesEndpoint}?id=${parkId}`);
    } else {
      return await fetchEndpoint(activiesEndpoint);
    }
  })();

  if(parkId) {
    park(data);
  } else {
    activities(data);
  }

})();
