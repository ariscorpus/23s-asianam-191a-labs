// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':2.5}

let UnitedStates = L.featureGroup();
let International = L.featureGroup();

let layers = {
    "United States": UnitedStates,
    "International": International
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRm2e8BARqHKPLpPHF5mwHvxf7ISAYIVywEhvKWHspk7x9X_8-txseibYaILaaq4veIgO_M7uLWw9hS/pub?output=csv"

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// add layer control box
L.control.layers(null,layers).addTo(map)

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

function addMarker(data){
    if(data['Is your location within or outside the United States?'] == "United States"){
        circleOptions.fillColor = "red"
        UnitedStates.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup`<h2>${data['What is your name?']}</h2> <h3>${data['Where did you visit?']}</h3> <h4>${data['How long were you there?']}</h4> <h5>${data['What did you do there?']}</h5`)
        createButtons(data.lat,data.lng,data['Where did you visit?'])
        }
    else{
        circleOptions.fillColor = "blue"
        International.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup`<h2>${data['What is your name?']}</h2> <h3>${data['Where did you visit?']}</h3> <h4>${data['How long were you there?']}</h4> <h5>${data['What did you do there?']}</h5`)
        createButtons(data.lat,data.lng,data['Where did you visit?'])
    }
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    vaccinated.addTo(map) // add our layers after markers have been made
    nonVaccinated.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([UnitedStates,International]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)
