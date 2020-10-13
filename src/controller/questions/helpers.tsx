export const numberOfStreams = (state, user, streamType) => {
  return Object.values(state.main_reducer).filter((d: any) => d.owner === user && d.streamType === streamType).length
}

export const removeMostRecentStream = (state, user, remove, set, streamType) => {
  console.log(streamType)
  const streams: any = Object.values(state.main_reducer)
    .filter((d: any) => d.owner === user && d.streamType === streamType)
    .sort((a: any, b: any) => b.createdAt - a.createdAt)
  set("selectedId", "ui_reducer", streams[1].id)
  remove(streams[0].id)
}
