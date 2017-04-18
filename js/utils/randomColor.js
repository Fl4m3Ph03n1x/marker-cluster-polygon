/**
 *  Generates a random color by randomly generating an hexadecimal string.
 *  
 *  @function generateRandomColor
 * 
 *  @returns {string}   A random hexadecimal string representing a color.
 * 
 *  @example
 *  {
 *      const color = generateRandomColor();
 *  }
 *  
 *  @see {@link http://stackoverflow.com/a/37472218/1337392}
 */
const generateRandomColor = () => '#' + Math.random().toString(16).slice(2, 8);