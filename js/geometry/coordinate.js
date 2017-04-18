"use strict";

/**
 *  Creates a Coordinate object with the given latitude and longitude. This 
 *  object is a useful abstraction as it encapsulates a requirement by the 
 *  google.maps.polygon that requires an object with this format in order to 
 *  draw a Polygon. 
 *  
 *  @module Coordinate
 * 
 *  @example
 *  {
 *      lat: 0.0,   //your lat here    
 *      lng: 0.0    //your lng here
 *  }
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