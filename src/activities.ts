export default (activities: Activity[]) => {
  // Create a new list item foreach activity

  const activitiesBody = document.querySelector("#activities tbody") as HTMLElement;
  activities.forEach(({ id, name, parks }: { id: string, name: string, parks: Park[] }) => {
    const tr = document.createElement("tr");
    // Add all states to a set to remove duplicates
    const statesSet = getStatesSet(parks);
    if([...statesSet].length > 50) {
      console.log([...statesSet]);
    }
    tr.innerHTML = `
        <td>${name}</td>
        <td>${String(parks.length)}</td>
        <td>${String([...statesSet].length)}</td>
    `;
    activitiesBody.appendChild(tr);
    tr.dataset.id = id;
  });

  // @ts-ignore
  const table = $('#activities').DataTable();

  $('#activities').on('click', 'tbody tr', function() {
    window.location.href = `/${this.dataset.id}`;
  });
  $('.show-activities').removeClass('show-activities');
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