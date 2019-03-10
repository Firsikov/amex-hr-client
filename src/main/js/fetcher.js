
export const get = url => fetch(url)
    .then(processServerResponse);

const processServerResponse = response => {
    if(response.ok)
        return response.text();

    return Promise.reject(`Failed to fetch data from the server: Error code ${response.status}`)
};