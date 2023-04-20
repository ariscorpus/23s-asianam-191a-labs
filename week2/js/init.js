// use the variables
const map = L.map('the_map').setView([34.0709,-118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

var circle = L.circle([33.7407, -117.8342], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.25,
    radius: 10000
}).addTo(map);

circle.bindPopup("Where to find the best Boba in the LA Area")

// use our marker functions

addMarker(37.7901, -122.4072,'Boba Guys SF','My personal favorite boba shop of all time')


addMarker(37.7637, -122.4786,'T-Pumps','Another great spot with great flavor selection')


addMarker(33.6880, -117.7892,'Omomo','A recent discovery my friends went to on our trip to Oceanside')


addMarker(34.0586, -118.4177,'Redstraw','Solid spot whenever ur shopping at Westfield')
