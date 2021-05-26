const API = "https://api.corona-zahlen.org/districts/09563/history/incidence/5";
const hands = ['👆🏻', '👆🏼', '👆🏽', '👆🏾', '👆🏿'];

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

function updateIncidenceValues(history) {
    const incidence = Number(history[history.length - 1]['weekIncidence']).toFixed(1).replace('.', ',');
    document.getElementById('incidence').innerText = incidence;

    const incidenceDate = new Date(history[history.length - 1]['date']).toLocaleDateString('de');
    document.getElementById('incidence_date').innerText = "Stand: " + incidenceDate;
}

function updatePlayableIcon(history) {
    for (let i = 0; i < history.length; i++) {
        if (history[i] >= 100) {
            document.getElementById('incidence_icon').classList.add('wave');
            document.getElementById('incidence_icon').innerText = hands[Number(Math.floor(Math.random() * hands.length).toFixed(1))];
            break;
        }
    }
}

function removeIncidenceValues() {
    document.getElementById('incidence-box').remove();
}