const API = "https://api.corona-zahlen.org/districts/09563/history/incidence/1";

getIncidence(API);

async function getIncidence(inputData) {
    fetch(inputData)
    .then(response => response.json())
    .then(response => {
        let incidence = response.data['09563'].history[0]['weekIncidence'];
        let incidenceNr = incidence;
        console.log(incidence);
        incidence = Number(incidence).toFixed(1).replace('.', ',');
        document.getElementById('incidence').innerText = incidence;

        let incidenceDate = Date.parse(response.data['09563'].history[0]['date']);
        incidenceDate = new Date(incidenceDate).toLocaleDateString('de');
        document.getElementById('incidence_date').innerText = "Stand: " + incidenceDate;
        
        if(incidenceNr < 50) {
            document.getElementById('incidence_icon').classList.remove('wave');
            document.getElementById('incidence_icon').classList.add('bounce');
            document.getElementById('incidence_icon').innerText = '⚽';
        }
    });
}