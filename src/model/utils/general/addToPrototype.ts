/** addToPrototype
 * adds a prototype to an object giving it access to methods in the parent prototype that will not be held in the target obect
 *@param target the object for which a prototype will be added
 *@param prototype the prototype which will be placed above the object that contains the methods
 *@returns the object with the prototype assigned
 **/

export const addToPrototype = (target, ...prototypes): any => {

  const allProtoTypes = prototypes.reduce((a, prototype) => ({ ...a, ...prototype }), {})
  return Object.assign(Object.create(allProtoTypes), target)
}
