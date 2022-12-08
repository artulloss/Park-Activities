export default (parks: Park[]) => {
    const parksBody = document.querySelector("#parks tbody") as HTMLElement;
    for (const park of parks) {
        const tr = document.createElement("tr");    
        tr.innerHTML = `
            <td>${park.parkCode}</td>
            <td>${park.designation}</td>
            <td>${park.fullName}</td>
            <td>${park.name}</td>
        `;
        tr.addEventListener('click', () => {
            window.open(park.url, '_blank');
        });
        parksBody.appendChild(tr);
    }
    $('.show-parks').removeClass('show-parks');
    // @ts-ignore
    const table = $('#parks').DataTable();
}