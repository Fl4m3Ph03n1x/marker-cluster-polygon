"use strict";

/*global google*/
/*global DISTRICTS*/
/*global POIS*/
/*global MarkerManager*/

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {
      lat: 38.184,
      lng: -7.117
    },
    mapTypeId: 'terrain'
  });

  setUpMarkerManager(map);
  drawDistricts(map);
}

//Check https://github.com/googlemaps/v3-utility-library/blob/master/markermanager/docs/reference.html
function setUpMarkerManager(aMap) {
  let mgr = new MarkerManager(aMap);

  let poisPerDistrict = new Map();
  let allPOISArray = [];


  POIS.forEach(element => {

    let poiDistrict = element.district;
    if (poisPerDistrict.has(poiDistrict)) {
      let poiCount = poisPerDistrict.get(poiDistrict) + 1;
      poisPerDistrict.set(poiDistrict, poiCount);
    }
    else
      poisPerDistrict.set(poiDistrict, 1);

    allPOISArray.push(new google.maps.Marker({
      position: new google.maps.LatLng(element.coords.lat, element.coords.lng),
      title: element.name
    }));
  });

  let inverseCenter;
  let disctrictsCenter = [];
  DISTRICTS.forEach(element => {
    inverseCenter = getPolygonCenter(element.coords.coordinates[0]);

    if (poisPerDistrict.get(element.id))
    
      //For cool markers check https://developers.google.com/chart/image/docs/gallery/dynamic_icons#scalable_pins
      disctrictsCenter.push(new google.maps.Marker({
        position: new google.maps.LatLng(inverseCenter[1], inverseCenter[0]),
        icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.6|0|FFFFFF|12|_|" + poisPerDistrict.get(element.id),
        title: element.name
      }));
  });

  //every time we zoom in or out, we have to load the entire array. This is highly inneficient !
  //Or is it?
  google.maps.event.addListener(mgr, 'loaded', function() {
    mgr.addMarkers(allPOISArray, 9);
    mgr.addMarkers(disctrictsCenter, 0, 8);
    mgr.refresh();
  });
}

// http://stackoverflow.com/a/37472218/1337392
function getRandomColor() {
  return '#' + Math.random().toString(16).slice(2, 8);
}

function drawDistricts(aMap) {
  let randomColor;

  DISTRICTS.forEach(element => {
    randomColor = getRandomColor();

    new google.maps.Polygon({
      paths: getPolygonCoordinates(element.coords),
      strokeColor: randomColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: randomColor,
      fillOpacity: 0.35,
      map: aMap
    });
  });
}

function getPolygonCoordinates(polygon) {
  let coords = polygon.coordinates[0];
  let result = [];

  coords.forEach(element => {
    result.push({
      lng: element[0],
      lat: element[1]
    });
  });

  return result;
}

//Check http://stackoverflow.com/a/16282685/1337392
//Check https://en.wikipedia.org/wiki/Centroid
function getPolygonCenter(coords) {
  var minX, maxX, minY, maxY;
  for (var i = 0; i < coords.length; i++) {
    minX = (coords[i][0] < minX || minX == null) ? coords[i][0] : minX;
    maxX = (coords[i][0] > maxX || maxX == null) ? coords[i][0] : maxX;
    minY = (coords[i][1] < minY || minY == null) ? coords[i][1] : minY;
    maxY = (coords[i][1] > maxY || maxY == null) ? coords[i][1] : maxY;
  }
  return [(minX + maxX) / 2, (minY + maxY) / 2];
}

initMap();