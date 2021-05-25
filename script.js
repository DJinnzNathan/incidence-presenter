const API = "https://api.corona-zahlen.org/districts/09563/history/incidence/1";

getIncidence(API);

async function getIncidence(inputData) {
    fetch(inputData)
    .then(response => response.json())
    .then(response => {
        let incidence, incidenceDate = 0;
        for(let i = 0; i < response.data['09563'].history.length; i++) {
            incidence = response.data['09563'].history[i]['weekIncidence'];
            incidenceDate = Date.parse(response.data['09563'].history[i]['date']);
            console.log(incidence);
            console.log(incidenceDate);
        }
        let incidenceNr = incidence;
        incidence = Number(incidence).toFixed(1).replace('.', ',');
        document.getElementById('incidence').innerText = incidence;

        incidenceDate = new Date(incidenceDate).toLocaleDateString('de');
        document.getElementById('incidence_date').innerText = "Stand: " + incidenceDate;
        
        const hands = ['👆🏻', '👆🏼', '👆🏽', '👆🏾', '👆🏿'];

        if(incidenceNr < 50) {
            document.getElementById('incidence_icon').classList.remove('wave');
            document.getElementById('incidence_icon').classList.add('bounce');
            document.getElementById('incidence_icon').innerText = '⚽';
        } else {
            document.getElementById('incidence_icon').innerText = hands[Number(Math.floor(Math.random() * hands.length).toFixed(1))];
            console.log(Number(Math.floor(Math.random() * hands.length).toFixed(1)));
        }
    });
}