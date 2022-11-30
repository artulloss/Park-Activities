import debounce from "./debounce";
import "./style.css";

const api = "/rest";
const activiesEndpoint = api + "/activities/parks";

(async function () {

  async function fetchEndpoint(endpoint: string): Promise<any> {
    try {
      const response = await fetch(endpoint);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  const { data } = await fetchEndpoint(activiesEndpoint);

  // Create a new list item foreach activity

  const activities = document.getElementById("activities") as HTMLUListElement;

  data.forEach(({ name, parks }) => {
    const li = document.createElement("li");
    li.innerHTML = name;
    activities.appendChild(li);
  });

  document.getElementById("searchActivities")?.addEventListener(
    "input",
    debounce(1000, async (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      console.log(value);
      // const data = await fetchEndpoint(activiesEndpoint + "?q=" + value);
      console.log(activiesEndpoint + "?q=" + value);
      console.log(data);
      // return;
      // const { data } = await fetchEndpoint(activiesEndpoint + "?q=" + value);
      activities.innerHTML = "";
      // if(data.length > 0) {
      //   data.forEach(({ name, parks }) => {
      //     const li = document.createElement("li");
      //     li.innerHTML = name;
      //     activities.appendChild(li);
      //   });
      // } else {
      //   activities.innerHTML = "No results";
      // }
    })
  );

})();
