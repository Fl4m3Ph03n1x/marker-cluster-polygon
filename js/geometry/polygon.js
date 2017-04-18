"use strict";

/*global coordinateFactory*/

/**
 *  Creates a polygon, with the given array of coordinates in  in format 
 *  [lng, lat].
 * 
 *  @params     {Array}     An array of coordinates in format [lng, lat].
 *  @returns    {Polygon}   A Polygon Object. 
 */
const polygonFactory = function(theCoordinates) {

    /**
     *  Takes an array containing the coordinates in format [lng, lat] and 
     *  transforms it into an array of Coordinates. 
     * 
     *  @returns    {Array} An array containing the coordinates of the polygon.
     *
     *  @see        {@link http://stackoverflow.com/a/16282685/1337392}
     *  @see        {@link https://en.wikipedia.org/wiki/Centroid}
     */
    const transformCoordinates = (coords) => {
        return coords.reduce((prev, curr) => {
            prev.push(coordinateFactory(curr[1], curr[0]));
            return prev;
        }, []);
    };

    const coordinates = transformCoordinates(theCoordinates);

    /**
     * Calculates the center of this polygon, defined by its array of 
     * coordinates.
     * 
     * @returns {Coordinate}    The coordinate representing this polygon's
     *                          geometric center.
     *
     * @see {@link http://stackoverflow.com/a/16282685/1337392}
     * @see {@link https://en.wikipedia.org/wiki/Centroid}
     */
    const calculatePolygonCenter = () => {
        let minX, maxX, minY, maxY;

        coordinates.forEach(coordinate => {
            minX = (coordinate.lng < minX || minX === undefined) ? coordinate.lng : minX;
            maxX = (coordinate.lng > maxX || maxX === undefined) ? coordinate.lng : maxX;
            minY = (coordinate.lat < minY || minY === undefined) ? coordinate.lat : minY;
            maxY = (coordinate.lat > maxY || maxY === undefined) ? coordinate.lat : maxY;
        });

        return coordinateFactory((minY + maxY) / 2, (minX + maxX) / 2);
    };

    const polyCenter = calculatePolygonCenter();

    /**
     *  Returns the array of coordinates of this polygon. It is calculated only 
     *  once during the polygon's creation. 
     * 
     *  @returns {Array}    The array of coordinates from the polygon.
     */
    const getCoordinates = () => coordinates;

    /**
     *  Returns the center coordinate of this polygon. It is calculated only 
     *  once during the polygon's creation. 
     * 
     *  @returns {Coordinate}   The coordinate that represents the geometric 
     *                          center of the polygon.
     */
    const getPolygonCenter = () => polyCenter;

    return Object.freeze({
        getPolygonCenter,
        getCoordinates
    });
};