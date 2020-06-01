var myfirebase = firebase.database();
var submitButton = document.getElementById("searchButton");
var textInput = document.getElementById("search");
var buildingList = [];
var userLat;
var userLong;
var nearestVal = 2;
var nearestBuild;
var currType = "";

// binds enter key to search
textInput.addEventListener("keydown", function(event){
  if(event.keyCode == 13){
    event.preventDefault();
    search();
  }
});

// gets user location immediately after page load and location allowed
window.onload = getLocation();

// search button function
function search() {
  let input = document.getElementById("search").value.toLowerCase();
  
  // resets variables
  buildingList = [];
  nearestVal = 2;
  currType = "";
  
  // connecting to TrashType database
  let ref = myfirebase.ref("TrashType");
  ref.orderByKey().equalTo(input).on("child_added", function(snapshot) {
    let x = snapshot.val();
    let type = x.type.toString();
    currType = type.toString().toUpperCase();
    //console.log(JSON.parse(JSON.stringify(type)));
    //identifyBuilding(type, findClosest);
    building(type);
    alert("BIN: " + currType);
  });
}

// places the markers on the map
function building(x){
  let c = "";
  let z = x.toString();
  console.log(z);
  clear();
  // connecting to BldngInfo database
  let ref = myfirebase.ref("BldngInfo");
  switch(x){
    case "waste" : 
     c = "black"
     break;
    case "organic":
      c = "green"
      break;
    case "paper" :
      c = "yellow"
      break;
    case "recycling":
      c = "blue"
      break;
    case "battery":
      c = "red"
      break;
    case "electronic":
      c = "purple"
      break;
    case "softPlastic":
      c = "cyan"
      break;
    case "clothesDrop":
      c = "brown"
      break;
    case "refundable" :
      c = "orange"
      break;
  }
  ref.orderByChild(x).equalTo(1).on("child_added", function(snapshot){
    let x = snapshot.val();
    addToMap(x.BldngLat, x.BldngLong, snapshot.key,c);
  });
}

// gets all builings that have the bin available and adds into an array
function identifyBuilding(trashType, callback) {
  console.log("identifyBuilding executing...");
  let ref = myfirebase.ref("BldngInfo");
  ref.orderByChild(trashType).equalTo(1).on("child_added", function(snapshot) {
    buildingList.push(snapshot.key.toString());
  });
  console.log(JSON.parse(JSON.stringify(buildingList)));
  callback();
}

// gets latitude and longitude of each building
function findClosest() {
  console.log("findClosest executing...");
  for (let i = 0; i < buildingList.length; i++) {
    let ref = myfirebase.ref("BldngInfo");
    ref.orderByKey().equalTo(buildingList[i]).on("child_added", function(snapshot) {
      let x = snapshot.val();
      //console.log(snapshot.key);
      let temp = (userLat - x.BldngLat) + (userLong - x.BldngLong);
      console.log(JSON.parse(JSON.stringify(temp)));
      if (temp < nearestVal) {
        nearestVal = temp;
        nearestBuild = buildingList[i];
      }
    });
  }
  if (nearestVal == 2) {
    // do nothing 
  } else {
    alert("Closest Building: " + nearestBuild
         + "\nBin Type: " + currType);
  }
}

// gets user location coordinates
// https://medium.com/@adeyinkaadegbenro/how-to-detect-the-location-of-your-websites-visitor-using-javascript-92f9e91c095f
function getLocation() {
  navigator.geolocation.getCurrentPosition(function success(position) {
    // for when getting location is a success
    userLat  = position.coords.latitude;
    userLong = position.coords.longitude;
    console.log('latitude', userLat, 'longitude', userLong);
  });
}
