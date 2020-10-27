export const numberOfStreams = (state, user, streamType) => {
  return Object.values(state.main_reducer).filter((d: any) => d.owner === user && d.streamType === streamType).length
}

export const streams = (state, user, streamType) => {
  return Object.values(state.main_reducer).filter((d: any) => d.owner === user && d.streamType === streamType)
}

export const removeMostRecentStream = (state, user, remove, set, streamType) => {

  const streams: any = Object.values(state.main_reducer)
    .filter((d: any) => d.owner === user && d.streamType === streamType)
    .sort((a: any, b: any) => b.createdAt - a.createdAt)
  set("selectedId", "ui_reducer", streams[1].id)
  remove(streams[0].id)
}


export const clean = (str) => {
  switch (str) {
    case "tfsa": return "T.F.S.A"
    case "rrsp": return "R.R.S.P"
    case "personal": return "Personal Savings"
      
      break;
  
    default:
      break;
  }
}