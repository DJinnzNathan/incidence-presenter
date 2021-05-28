const hands = ['👆🏻', '👆🏼', '👆🏽', '👆🏾', '👆🏿'];
const mbokkeh = ['👌🏻', '👌🏼', '👌🏽', '👌🏾', '👌🏿'];

console.info('This script is using the API of Marlon Lückert. (https://api.corona-zahlen.org)');

fetch(getAPI())
    .then(response => response.json())
    .then(response => {
        const responseData = response.data[getCityCode()];

        updateIncidenceNumber(responseData.history);
        updateIncidenceDate(responseData.history);
        updatePlayableIcon(responseData.history);
        setCityName(responseData.name);
    })
    .catch((error) => {
        console.error('Fehler:', error);
        clearaIncidenceBox();
    });

/**
 * Parses the last and recent item of the incidence values and presents it in a div.
 * 
 * The function reads the incidence array from the json and takes the recent one. It cleans the number to one decimal and replaces the point to a comma for german convention. Afterwards, it's being printed to a specific id.
 * Furthermore, the date of the given incidence value is being changed to German locale standard and printed to a specific id.
 * 
 * @param {*} history the json from the API
 */
function updateIncidenceNumber(history) {
    const incidence = Number(history[history.length - 1]['weekIncidence']).toFixed(1).replace('.', ',');
    document.getElementById('incidence').innerText = incidence;
}

/**
 * Parses the date of the incidence values and presents it in a div.
 *
 * The date of the given incidence value is being changed to German locale standard and printed to a specific id.
 * 
 * @param {*} history the json from the API
 */
function updateIncidenceDate(history) {
    const incidenceDate = new Date(history[history.length - 1]['date']).toLocaleDateString('de');
    document.getElementById('incidence_date').innerText = "Stand: " + incidenceDate;
}

/**
     * Updates the icon depending on incidence number.
     *
     * This function checks the incidence and determines, whether playing contact sport is possible or not.
     * If one of the incidence values of the last 5 days is higher than 100, contact sport is not possible, else it is possible when tested the same day or vaccinated.
     * If the incidence of the last 5 days is under 50, then contact sport is possible without any restrictions. Shows then the mbokkeh emoji next to the bouncing ball.
     *  
     * @param {*} history the json from the API
     */
function updatePlayableIcon(history) {
    let incidenceUnder100 = true;
    let incidenceUnder50 = true;
    for (let i = 0; i < history.length; i++) {
        if (history[i].weekIncidence > 50) {
            incidenceUnder50 = false;
        }
        if (history[i].weekIncidence >= 100) {
            incidenceUnder100 = false;
            break;
        }
        console.log(history[i].weekIncidence + ': ' + incidenceUnder100 + ' ' + incidenceUnder50);
    }
    updateIconElement(incidenceUnder100, incidenceUnder50);
}
/**
 * Removes the area, i.e. when an incidence number cannot be shown.
 */
function clearIncidenceBox() {
    document.getElementById('incidence-box').remove();
}

function updateIconElement(isUnder100, isUnder50) {
    if (isUnder100 === false) {
        console.log("over 100");
        document.getElementById('incidence_icon').classList.remove('bounce');
        document.getElementById('incidence_icon').classList.add('wave');
        document.getElementById('incidence_icon').innerText = hands[Number(Math.floor(Math.random() * hands.length).toFixed(1))];
        updateTitle('incidence-box', 'Kontaktloser Sport mit 2 Personen aus 2 Haushalten möglich');
    } else if (isUnder100 === true && isUnder50 === false) {
        console.log("under 100");
        updateTitle('incidence-box', 'Kontaktsport von 25 Personen mit Testnachweis, Immunität oder Impfung möglich');
    } else {
        console.log("under 50");
        document.getElementById('incidence_icon_clear').innerText = mbokkeh[Number(Math.floor(Math.random() * hands.length).toFixed(1))];
        updateTitle('incidence-box', 'Kontaktsport ohne Einschränkung möglich');
    }

}

function getCityCode() {
    return document.getElementById('incidence-box').dataset.cityCode;
}

function getAPI() {
    return "https://api.corona-zahlen.org/districts/" + getCityCode() + "/history/incidence/5";
}

function setCityName(name) {
    document.getElementById('incidence-box').dataset.cityName = name;
}

function updateTitle(id, msg) {
    document.getElementById(id).title = msg;
}

/**
 * Translates the text from English to the defined target language.
 * 
 * @param {*} text the text to be translated, must be in English
 * @param {*} targetLang the target language as a country domain code, i.e. Germany = de
 */
async function translate(text, targetLang) {
    if (targetLang != 'en') {
        const res = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: 'en',
                target: targetLang
            }),
            headers: { "Content-Type": "application/json" }
        });
        console.log(await res.json());
    }
}