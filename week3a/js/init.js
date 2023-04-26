// declare the map
const map = L.map('the_map').setView([34.0709,-118.444], 5);

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
