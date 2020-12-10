

/**  pipe
*  This is used to fire multiple consecutive functions where each one does something to the primary object and passes it along to the next function
 *@param functions any number of functions
 *@param args any number of arguments that will be passed into the first function
 *@returns the return value of the final function
**/ 

export const pipe = (...functions) => (...args) => functions.reduce((arg, fn) => fn(...arg), args);