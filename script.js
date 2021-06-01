const hands = ["👆🏻", "👆🏼", "👆🏽", "👆🏾", "👆🏿"];
const mbokkeh = ["👌🏻", "👌🏼", "👌🏽", "👌🏾", "👌🏿"];
const ball = "⚽";

console.info(
  "This script is using the API of Marlon Lückert. (https://api.corona-zahlen.org)"
);

fetch(getAPI())
  .then((response) => response.json())
  .then((response) => {
    const responseData = response.data[getCityCode()];

    updateIncidenceNumber(responseData.history);
    updateIncidenceDate(responseData.history);
    updatePlayableIcon(responseData.history);
    setCityName(responseData.name);
  })
  .catch((error) => {
    console.error("Fehler:", error);
    clearIncidenceBox();
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
  const incidence = Number(history[history.length - 1]["weekIncidence"])
    .toFixed(1)
    .replace(".", ",");
  updateText("incidence", incidence);
}

/**
 * Parses the date of the incidence values and presents it in a div.
 *
 * The date of the given incidence value is being changed to German locale standard and printed to a specific id.
 *
 * @param {*} history the json from the API
 */
function updateIncidenceDate(history) {
  const incidenceDate = new Date(
    history[history.length - 1]["date"]
  ).toLocaleDateString("de");
  document.getElementById("incidence_date").innerText =
    "Stand: " + incidenceDate;
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
  updateIcon("incidence_icon", "bounce", ball, "Kontaktsport ohne Einschränkung möglich");
  updateText("incidence_icon_clear", getRandomIcon(mbokkeh));
  for (let i = 0; i < history.length; i++) {
    if (history[i].weekIncidence > 50 || history[i].weekIncidence < 100) {
      if (document.getElementById("incidence_icon") !== null) {
        removeIcons("incidence_icon");
      }
      updateIcon("incidence_icon", "bounce", ball, "Kontaktsport von 25 Personen mit Testnachweis, Immunität oder Impfung möglich");
    }
    if (history[i].weekIncidence >= 100) {
      if (document.getElementById("incidence_icon") !== null) {
        removeIcons("incidence_icon");

        
      }
      updateIcon("incidence_icon", "wave", getRandomIcon(hands), "Kontaktloser Sport mit 2 Personen aus 2 Haushalten möglich");
    }
  }
}

/**
 *
 *
 * @param {*} id The id of the element that receives the icon
 * @param {*} className the added class, i.e. used for adding animation
 * @param {*} icon The icon in use
 * @param {*} msg The title text that goes over whole "incidence-box"
 */
function updateIcon(id, className, icon, msg) {
  addClass(id, className);
  updateText(id, ball);
  updateTitle("incidence-box", msg);
}

function addClass(id, className) {
  document.getElementById(id).classList.add(className);
}

function removeIcons() {
  removeClass("incidence_icon", className);
  if (document.getElementById("incidence_icon") !== null) {
    removeText("incidence_icon");
  }
}

/**
 * Not in use, may be removed ;)
 */
function removeClass(id, className) {
  document.getElementById(id).classList.remove(className);
}

function removeText(id) {
  document.getElementById(id).remove();
}

/**
 * Removes the complete area.
 */
function clearIncidenceBox() {
  document.getElementById("incidence-box").remove();
}

function getCityCode() {
  return document.getElementById("incidence-box").dataset.cityCode;
}

function getIncidenceDays() {
  return document.getElementById("incidence-box").dataset.incidenceDays;
}

function getAPI() {
  return (
    "https://api.corona-zahlen.org/districts/" +
    getCityCode() +
    "/history/incidence/" +
    getIncidenceDays()
  );
}

function getRandomIcon(iconset) {
  return iconset[Number(Math.floor(Math.random() * iconset.length).toFixed(1))];
}

function setCityName(name) {
  document.getElementById("incidence-box").dataset.cityName = name;
}

function updateTitle(id, msg) {
  document.getElementById(id).title = msg;
}

function updateText(id, msg) {
  document.getElementById(id).innerText = msg;
}
