export default (data: ActivityResponse) => {
  // Create a new list item foreach activity

  const activitiesBody = document.querySelector("#activities tbody") as HTMLElement;

  data.forEach(({ id, name, parks }: { id: string, name: string, parks: Park[] }) => {
    const tr = document.createElement("tr");
    const activityNameTd = document.createElement("td");
    const parksAvailableInTd = document.createElement("td");
    const statesAvailableInTd = document.createElement("td");
    activityNameTd.innerText = name;
    parksAvailableInTd.innerText = parks.length.toString();
    // Add all states to a set to remove duplicates
    const statesSet = getStatesSet(parks);
    statesAvailableInTd.innerText = String([...statesSet].length);
    if([...statesSet].length > 50) {
      console.log([...statesSet]);
    }
    tr.appendChild(activityNameTd);
    tr.appendChild(parksAvailableInTd);
    tr.appendChild(statesAvailableInTd);
    activitiesBody.appendChild(tr);
    tr.dataset.id = id;
  });

  // @ts-ignore
  const table = $('#activities').DataTable();

  $('#activities').on('click', 'tbody tr', function() {
    window.location.href = `/activities/${this.dataset.id}`;
  });
}

function getStatesSet(parks: Park[]) {
    const statesSet = new Set<string>();
    parks.forEach(({ states }) => {
      states.split(',').forEach(state => {
        if (states !== "") {
          statesSet.add(state);
        }
      });
    });
    return statesSet;
  }