let mapOptions = {'center': [34.0709,-118.444],'zoom':5, 'title':"Good Maps"}
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom, mapOptions.title.split("M"));
console.log(mapOptions)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(33.8122, -117.9190,'🏰 Disneyland! 🏰','you cant go wrong with the happiest place on Earth')
addMarker(20.8013, -156.3311,'🌺 Maui Wowie! 🌺','my favorite island and the one I visit the most')
addMarker(40.4321, 116.5704,'🇨🇳 The Great Wall! 🇨🇳','visited China in 2012 with my parents and grandma')
addMarker(40.7209, -73.9934,'🍎 The Big Apple! 🍎','went to the big city when I was 10 but I would love to go again to appreciate the fashion and culture')
addMarker(20.9890, -86.8290,'🌴 The Cuuuuun! 🌴','Cancun was really fun and I actually ran into my friend there and we went clubbing lol')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title); 
    return message
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpOaH94y-oguAqbtcvZRyKdrEYiT1JOzW0jmmreznYS8THdQTYQ6cUB7J_68SZLgjpXbB_FY_nDf2A/pub?output=csv"

function loadData(url){
    fetch(url)
        .then(response => {
            console.log(response)
            return response
        })
        .then(data =>{
            // do something with the data
        })
}
// we will put this comment to remember to call our function later!
loadData(dataUrl)


var circle = L.circle([33.7407, -117.8342], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.25,
    radius: 10000
}).addTo(map);

circle.bindPopup("Where to find the best Boba in the LA Area")

fetch("map.geojson") 
    .then(response => { 
        return response.json();
    })
    .then(data =>{ 

    // the leaflet method for adding a geojson
        L.geoJSON(data)
        .bindPopup(layer => {
            console.log(data.features.properties)
        return "you clicked a geojson!";
    }).addTo(map);

        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data).addTo(map)
    });

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("contents").appendChild(newButton); 
}
