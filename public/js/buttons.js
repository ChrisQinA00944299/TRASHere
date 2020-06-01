var myFirebase = firebase.database();

var wasteButton = document.getElementById("waste");
var recyclingButton = document.getElementById("recycling");
var compostButton = document.getElementById("compost");
var paperButton = document.getElementById("paper");

// event listeners for the common trash types
wasteButton.addEventListener("click", function(){
  var ref = myFirebase.ref("BldngInfo");
  //clears the map of current markers if there are any
  clear();
  ref.on("child_added", function(snapshot){
    var x = snapshot.val();
    if(x.waste == 1){
      addToMap(x.BldngLat,x.BldngLong, snapshot.key, "black");
      }
      console.log("BuildingNo " + snapshot.key);
      console.log("Latitute " + x.BldngLat);
      console.log("Longitude " + x.BldngLong)
      console.log("Garbage? " + x.waste)
  });
});


recyclingButton.addEventListener("click", function(){
  var ref = myFirebase.ref("BldngInfo");
  clear();
  ref.on("child_added", function(snapshot){
    var x = snapshot.val();
    if(x.recycling == 1){
      addToMap(x.BldngLat,x.BldngLong, snapshot.key, "blue");
      }
    console.log("BuildingNo " + snapshot.key);
    console.log("Latitute " + x.BldngLat);
    console.log("Longitude " + x.BldngLong)
    console.log("Recyling " + x.recycling)
  });
});


compostButton.addEventListener("click", function(){
  var ref = myFirebase.ref("BldngInfo");
  clear();
  ref.on("child_added", function(snapshot){
    var x = snapshot.val();
    if(x.organic == 1){
    addToMap(x.BldngLat,x.BldngLong, snapshot.key, "green");
    }
      console.log("BuildingNo " + snapshot.key);
      console.log("Latitute " + x.BldngLat);
      console.log("Longitude " + x.BldngLong)
      console.log("Compost? " + x.organic)
  });
});


paperButton.addEventListener("click", function(){
  var ref = myFirebase.ref("BldngInfo");
  clear();
  ref.on("child_added", function(snapshot){
    var x = snapshot.val();
    if(x.paper == 1){
      addToMap(x.BldngLat,x.BldngLong, snapshot.key, "yellow");
      }
      console.log("BuildingNo " + snapshot.key);
      console.log("Latitute " + x.BldngLat);
      console.log("Longitude " + x.BldngLong)
      console.log("Paper " + x.paper)
  });
});
