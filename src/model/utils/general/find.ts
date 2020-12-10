/** find
 * Iterates over an array to find the object with the same properties as the object given as the second argument
 *@param array an array that contains objects
 *@param queryObject an object containing the values for which you'd like to search
 *@returns the object found
 **/

// export function find<T>(arr: T[], obj: Partial<T>): T {
//   return arr.find((d) =>
//     Object.entries(obj)
//       .map(([k, v]) => d[k] === v)
//       .every((b) => b)
//   );
// }

interface Tobject<T> {
  [key: string]: T
}

function find<T>(collection: T[] | Tobject<T>, query: Partial<T>): T {
  const filterArray = <T>(arr: T[]): T =>
    arr.find((d: T) =>
      Object.entries(query)
        .map(([k, v]) => d[k] === v)
        .every(b => b)
    )

  if (Array.isArray(collection)) {
    return filterArray<T>(collection)
  }
  if (typeof collection === "object") {
    return filterArray<T>(Object.values(collection))
  }
}

export { find }

// export { find }
