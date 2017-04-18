/**
 *  Generates a random color by randomly generating an hexadecimal string.
 *  
 *  @function generateRandomColor
 * 
 *  @returns {string}   A random hexadecimal string representing a color.
 * 
 *  @example
 *  const randomColor = generateRandomColor();
 *  console.log(randomColor);
 * 
 *  new google.maps.Polygon({
 *      paths: coords,              //your polygon coordinates
 *      strokeColor: randomColor,
 *      strokeOpacity: 0.8,
 *      strokeWeight: 2,
 *      fillColor: randomColor,
 *      fillOpacity: 0.35,
 *      map: myMap                  //your google map
 *  });
 *  
 *  @see {@link http://stackoverflow.com/a/37472218/1337392}
 */
const generateRandomColor = () => '#' + Math.random().toString(16).slice(2, 8);