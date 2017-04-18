"use strict";

/*global google*/
/*global DISTRICTS*/
/*global POIS*/
/*global MarkerManager*/
/*global generateRandomColor*/
/*global polygonFactory*/
/*global coordinateFactory*/

(function initMap() {
    const googleMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: coordinateFactory(38.184, -7.117),
        mapTypeId: 'terrain'
    });

    //Aggregate POIs by district and set up map of markers that counts how many
    //POIs a district has (for zoomed out markers)
    const poisPerDistrict = new Map();
    const allPOISArray = [];
    POIS.forEach(element => {

        const poiDistrict = element.district;
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
    
    //Create Polygons
    const districts  = DISTRICTS.reduce((prev, curr) => {
        prev[curr.id] = polygonFactory(curr.coordinates);
        return prev;
    }, {});
    
    //Define Polygons center and add markers to center
    const disctrictsCenter = [];
    let polyCenter, polyId;
    DISTRICTS.forEach(element => {
        polyId = element.id;
        polyCenter = districts[polyId].getPolygonCenter();
        
        if (poisPerDistrict.get(polyId)) {
            //For cool markers check https://developers.google.com/chart/image/docs/gallery/dynamic_icons#scalable_pins
            disctrictsCenter.push(new google.maps.Marker({
                position: new google.maps.LatLng(polyCenter.lat, polyCenter.lng),
                icon: "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.6|0|FFFFFF|12|_|" + poisPerDistrict.get(polyId),
                title: polyId
            }));
        }

    });
    
    //Set up Marker Manager and set listeners
    //Check https://github.com/googlemaps/v3-utility-library/blob/master/markermanager/docs/reference.html
    const mgr = new MarkerManager(googleMap);
    google.maps.event.addListener(mgr, 'loaded', function() {
        mgr.addMarkers(allPOISArray, 9);
        mgr.addMarkers(disctrictsCenter, 0, 8);
        mgr.refresh();
    });
    
    //draw Polygons
    let randomColor;
    DISTRICTS.forEach(element => {
        randomColor = generateRandomColor();

        new google.maps.Polygon({
            paths: districts[element.id].getCoordinates(),
            strokeColor: randomColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: randomColor,
            fillOpacity: 0.35,
            map: googleMap
        });
    });
}());
