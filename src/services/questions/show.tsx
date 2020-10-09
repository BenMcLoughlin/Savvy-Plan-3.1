export const getIntro = (q, set) => q.push({
  data: "intro",
  component: "null",
  valid: true,
  label: "continue",
  handleChange: () => set("progress", "ui_reducer", 1),
}) 


export const getCommentsToShowUser = (q, state, set) => ({
  everyone: {
    onboardIntro: () => getIntro(q,set)
  }
})