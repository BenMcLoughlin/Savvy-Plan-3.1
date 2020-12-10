/** filter
 * Iterates over a collection which could be an object or an array to find the object with the same properties as the query
 *@param collection an array or an object
 *@param queryObject an object containing the values for which you'd like to search
 *@returns the object found
 **/

interface Tobject<T> {
  [key: string]: T
}


function filter<T>(collection: T[] | Tobject<T>, query: Partial<T>): T[] {
  const filterArray = <T>(arr: T[]): T[] =>
    arr.filter((d: T) =>
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

export { filter }
