const API = "https://api.corona-zahlen.org/districts/09563/history/incidence/5";
const hands = ['👆🏻', '👆🏼', '👆🏽', '👆🏾', '👆🏿'];
const mbokkeh = ['👌🏻', '👌🏼', '👌🏽', '👌🏾', '👌🏿'];

fetch(API)
    .then(response => response.json())
    .then(response => {
        const history = response.data['09563'].history;

        updateIncidenceValues(history);
        updatePlayableIcon(history);
    })
    .catch((error) => {
        console.error('Fehler:', error);
        removeIncidenceValues();
    });
/**
 * Parses the last and recent item of the incidence values and presents it in a div.
 * 
 * The function reads the incidence array from the json and takes the recent one. It cleans the number to one decimal and replaces the point to a comma for german convention. Afterwards, it's being printed to a specific id.
 * Furthermore, the date of the given incidence value is being changed to German locale standard and printed to a specific id.
 * 
 * @param {*} history the json from the API
 */
function updateIncidenceValues(history) {
    const incidence = Number(history[history.length - 1]['weekIncidence']).toFixed(1).replace('.', ',');
    document.getElementById('incidence').innerText = incidence;

    const incidenceDate = new Date(history[history.length - 1]['date']).toLocaleDateString('de');
    document.getElementById('incidence_date').innerText = "Stand: " + incidenceDate;
}

/**
     * Updates the icon depending on incidence number.
     *
     * This function checks the incidence and determines, whether playing contact sport is possible or not.
     * If one of the incidence values of the last 5 days is higher than 100, contact sport is not possible, else it is possible when vaccinated or tested.
     * 
     * TODO: If the incidence of the last 5 days is under 50, then contact sport is possible without restrictions. 
     * 
     * @param {*} history the json from the API
     */
function updatePlayableIcon(history) {
    for (let i = 0; i < history.length; i++) {
        if (history[i] >= 100) {
            document.getElementById('incidence_icon').classList.add('wave');
            document.getElementById('incidence_icon').innerText = hands[Number(Math.floor(Math.random() * hands.length).toFixed(1))];
            break;
        }
    }
}
/**
 * Removes the area, so no information is displayed. 
 */
function removeIncidenceValues() {
    document.getElementById('incidence-box').remove();
}