"use strict";

/**
 *  Creates a Coordinate object with the given latitude and longitude. This 
 *  object is a useful abstraction as it encapsulates a requirement by the 
 *  google.maps.polygon that requires an object with this format in order to 
 *  draw a Polygon. 
 *  
 *  @exports Coordinate
 * 
 *  @example
 *  const myCoord  = coordinateFactory(0, 1);
 *  console.log(`Coord is: ${myCoord.lat}, ${myCoord.lng}`);
 *  
 *  @params     {Number}        lat The latitude of the coordinate.
 *  @params     {Number}        lng The longitude of the coordinate.
 *  @returns    {Coordinate}    The coordinate.
 * 
 *  @see {@link https://developers.google.com/maps/documentation/javascript/examples/polygon-simple}
 */
const coordinateFactory = function(lat, lng) {
    return {
        lat,
        lng
    };
};