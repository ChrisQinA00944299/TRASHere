// initial map view
var mymap = L.map('mapid').setView([49.250586, -123.003005], 15);

// color icon properties
var colorIcons = L.Icon.extend({
  options: {
    iconSize:     [21, 35],   // size of the icon
    iconAnchor:   [12, 30],   // point of the icon which will correspond to marker's location
    popupAnchor:  [0.5, -30], // point from which the popup should open relative to the iconAnchor
    shadowUrl:    null,
    shadowSize:   null,  // size of the shadow
    shadowAnchor: null,  // the same for the shadow
  }
});

// colorful markers
var greenIcon = new colorIcons({iconUrl: 'Pictures/green.png'});
var redIcon = new colorIcons({iconUrl: 'Pictures/red.png'});
var	blueIcon = new colorIcons({iconUrl: 'Pictures/blue.png'});
var	yellowIcon = new colorIcons({iconUrl: 'Pictures/yellow.png'});
var	purpleIcon = new colorIcons({iconUrl: 'Pictures/purple.png'});
var	brownIcon = new colorIcons({iconUrl: 'Pictures/brown.png'});
var	pinkIcon = new colorIcons({iconUrl: 'Pictures/pink.png'});
var	orangeIcon = new colorIcons({iconUrl: 'Pictures/orange.png'});
var	cyanIcon = new colorIcons({iconUrl: 'Pictures/cyan.png'});
var	blackIcon = new colorIcons({iconUrl: 'Pictures/black.png'});

// map fine print
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// layer for all markers
var markers = L.layerGroup();

// adds marker to markers layer
function addToMap(x,y,z,color){
  var marker = L.marker([x,y]).addTo(mymap);
  marker.bindPopup(z);

  if(color == "green"){
    marker.setIcon(greenIcon);
  } else if(color == "blue"){
    marker.setIcon(blueIcon);
  } else if(color == "yellow"){
    marker.setIcon(yellowIcon);
  } else if(color == "black"){
    marker.setIcon(blackIcon);
  } else if(color == "red"){
    marker.setIcon(redIcon);
  } else if(color == "purple"){
    marker.setIcon(purpleIcon);
  } else if(color == "pink"){
    marker.setIcon(pinkIcon);
  } else if(color == "cyan"){
    marker.setIcon(cyanIcon);
  } else if(color == "orange"){
    marker.setIcon(orangeIcon);
  } else if (color == "brown"){
    marker.setIcon(brownIcon);
  }
  marker.addTo(markers);
}

// clears markers layer
function clear(){
  markers.clearLayers();
}

// adds markers layer into map
markers.addTo(mymap);


/*EasterEgg.bindPopup("<b>This is where you find elephant waste</b>");*/

// user location
var position = L.layerGroup();

// adds user to map
position.addTo(mymap);

// focuses on user location
mymap.locate({setView: true, maxZoom: 16});

// creates a circle border around user
function onLocationFound(e) {
  var radius = e.accuracy / 2;
  var pos = L.marker(e.latlng).addTo(mymap).bindPopup("You are here").openPopup();
  pos.addTo(position);
  L.circle(e.latlng, radius).addTo(mymap);
}

mymap.on('locationfound', onLocationFound);

// location error handling
function onLocationError(e) {
  alert(e.message);
}

mymap.on('locationerror', onLocationError);
