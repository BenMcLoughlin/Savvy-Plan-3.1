export const set = (id: string, reducer: string, value: any, childId1?: any, childId2?: any, childId3?: any): any => {
  return {
    type: `${reducer}/SET_VALUE`,
    childId1, // child id in the id value pair of the object nested within the parent object,
    childId2, // child id in the id value pair of the object nested within the parent object,
    childId3, 
    id, // parent id is the id to the lower level child object
    value,
  }
}

export const remove = (id: string, reducer="main_reducer"): any => {
  return {
    type: `${reducer}/REMOVE`,
    id,
  }
}
