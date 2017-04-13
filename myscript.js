"use strict";

/*global google*/
/*global DISTRICTS*/
/*global POIS*/
/*global MarkerManager*/

function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
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

  google.maps.event.addListener(mgr, 'loaded', function() {
    mgr.addMarkers(allPOISArray, 9);
    mgr.addMarkers(disctrictsCenter, 0, 8);
    mgr.refresh();
  });
}

/**
 *  Generates a random color for the regions by randomly generating a string.
 * 
 * @see {@link http://stackoverflow.com/a/37472218/1337392}
 */
const getRandomColor = () => '#' + Math.random().toString(16).slice(2, 8);

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

/**
 * Calculates the center of the given poligon, defined by the array of 
 * coordinates.
 * 
 * @see {@link http://stackoverflow.com/a/16282685/1337392}
 * @see {@link https://en.wikipedia.org/wiki/Centroid}
 */
const getPolygonCenter = coords => {
  let minX, maxX, minY, maxY;

  coords.forEach(coordinate => {
    minX = (coordinate[0] < minX || minX === undefined) ? coordinate[0] : minX;
    maxX = (coordinate[0] > maxX || maxX === undefined) ? coordinate[0] : maxX;
    minY = (coordinate[1] < minY || minY === undefined) ? coordinate[1] : minY;
    maxY = (coordinate[1] > maxY || maxY === undefined) ? coordinate[1] : maxY;
  });

  return [(minX + maxX) / 2, (minY + maxY) / 2];
};

initMap();