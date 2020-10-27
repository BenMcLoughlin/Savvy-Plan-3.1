import * as I from "model/types"
import _ from "lodash"
import { buttons, onboardQuestions, showUsers } from "controller/questions/questions.controller"
import { numberOfStreams, streams } from "controller/questions/helpers"

export const onboard_questions = (data: any, state: any, set: any, progress: number, remove: any) => {
  const { user1 } = state.user_reducer
  const q: any = []

  const askUser1 = onboardQuestions(q, remove, set, state, "user1")
  const askUser2 = onboardQuestions(q, remove, set, state, "user2")
  const show = showUsers(q, set, state)

  show.introduction()
  askUser1.for.name()
  askUser1.for.birthYear()
  askUser1.for.gender()
  askUser1.if.isMarried()
  if (user1.isMarried) {
    askUser2.for.name()
    askUser2.for.birthYear()
    // askUser2.for.gender()
  }
  askUser1.if.theyHaveChildren()
  if (user1.hasChildren) {
    askUser1.for.numberOfChildren()
  }

  askUser1.to.create.income()

  streams(state, "user1", "income").map((s,i) => {
    askUser1.for.income.name(i)
    askUser1.for.income.registration()
    askUser1.for.income.amount(i)
    askUser1.if.addAnother.income()
  })

  //show.incomeParagraph()

  if (user1.isMarried) {
    askUser2.to.create.income()
    streams(state, "user2", "income").map((s,i) => {
      askUser2.for.income.name(i)
      askUser2.for.income.registration()
      askUser2.for.income.amount(i)
      askUser2.if.addAnother.income()
      show.combinedIncomeChart()
    })
  }
  askUser1.for.desiredRetirementIncome()
  show.idealIncomeChart(1)
  show.idealIncomeChart(2)

  askUser1.to.create.savings()

  streams(state, "user1", "savings").map((s,i) => {
    askUser1.for.savings.currentValue()
    askUser1.for.savings.contributions(i)
    askUser1.for.savings.withdrawals(i)
    askUser1.for.savings.rates(i)
  })

  //DUMMY
  askUser1.for.name()
  askUser1.for.birthYear()
  askUser1.for.gender()
  askUser1.if.isMarried()

  // if (user1.isMarried) {
  //   ask.for.user2.income.details()
  // }
  // ask.for.user1.savings.details()
  // if (user1.isMarried) {
  //   ask.for.user2.savings.details()
  // }
  // ask.for.user1.networth.details()
  // if (user1.isMarried) {
  //   ask.for.user2.networth.details()
  // }
  // ask.for.user1.spending.details()
  // if (user1.isMarried) {
  //   ask.for.user2.spending.details()
  // }
  // ask.for.user1.name()
  // ask.for.user1.name()
  // ask.for.user1.name()
  // ask.for.user1.name()

  const questions = q.flat().map(d => d)
//console.log(questions)
  const add = buttons(questions, set, state)

  return {
    questions,
    nextButton: add.nextButton(),
    backButton: add.backButton(),
  }
}
