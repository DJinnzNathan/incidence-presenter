[![Try it out](https://img.shields.io/badge/Try%20it-online-blue)](https://staticfiles.djinnznathan.com/incidence/) [![GitHub issues](https://img.shields.io/github/issues/DJinnzNathan/incidence-presenter)](https://github.com/DJinnzNathan/incidence-presenter/issues) ![GitHub last commit](https://img.shields.io/github/last-commit/DJinnzNathan/incidence-presenter)

# COVID incidence-presenter for Germany
This simple script presents the incidence of a certain city in Germany on a webpage. The API being used is from @marlon360.

## Motivation  
For finally doing sports, we had to wait and watch the incidence fall and hold above a certain threshold. 
To present the recent status on the clubs webpage, I've written this simple script, which receives data from an API by @marlon360. 

## Usage  
In order to use this script onto your webpage, first upload and include the **script.js** (*and style.css*) in the `<head>` of your HTML.

`<script src="https://staticfiles.djinnznathan.com/incidence/script.js" defer></script>` *Change the src-URL, if you store the script in your own server.*

Same applies to your style.css: 

`<link rel="stylesheet" href="https://staticfiles.djinnznathan.com/incidence/style.css">`

Then, insert this code at the desired place:

```HTML
<div id="incidence-box" data-city-code="CITY_ID" data-city-name="">
        7-Tage-Inzidenz:
        <span id="incidence"></span>
        <span class="bounce" id="incidence_icon">⚽</span>
        <div>
            <span id="incidence_date"></span>
            <sup>
                <a id="incidence-source" href="https://api.corona-zahlen.org/">&#8505;</a>
            </sup>
        </div>
    </div>
```

Replace the `CITY_ID` with a 5-digit code like `05314` for **Bonn**. Use this API-Call to find out the required code by searching for a city name: https://api.corona-zahlen.org/districts/

Now the script presents the recent incidence and shows an icon, if it is safe to open with the given rulesets.  
*The rules used in this script was a stable incidence for 5 days under 100 to be able to do sport.* 
