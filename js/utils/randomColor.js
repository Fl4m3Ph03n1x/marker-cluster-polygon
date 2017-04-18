/**
 *  Generates a random color by randomly generating an hexadecimal string.
 *  
 *  @returns {string}   An random hexadecimal string representing a color.
 * 
 *  @see {@link http://stackoverflow.com/a/37472218/1337392}
 */
const generateRandomColor = () => '#' + Math.random().toString(16).slice(2, 8);