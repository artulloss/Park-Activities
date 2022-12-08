import activities from "./activities";
import { fetchEndpoint, activiesEndpoint } from "./api";

export async function setupRefreshForm() {
    const refreshForm = document.getElementById('refreshForm') as HTMLFormElement;
    if (!refreshForm) return;
    refreshForm.querySelectorAll('input:not([type="submit"])');
    refreshForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Use the data from our form to fetchEndpoint and then update the table
        const formData = new FormData(refreshForm);
        // @ts-ignore
        const params = Object.fromEntries(formData.entries());
        for(const prop in params) {
            if(params[prop] === '') {
                delete params[prop];
            }
        }
        const urlParams = new URLSearchParams(params).toString();
        $(".loader").removeClass("hide");
        fetchEndpoint(`${activiesEndpoint}?${urlParams}`).then(({ data }) => {
            const activitiesBody = document.querySelector("#activities tbody") as HTMLElement;
            // @ts-ignore
            if ($.fn.DataTable.isDataTable('#activities')) {
                // @ts-ignore
                $('#activities').DataTable().destroy();
            }
            activitiesBody.innerHTML = '';
            activities(data);
        });
    });
}