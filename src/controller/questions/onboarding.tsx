import * as I from "model/types"
import { buttons, onboardQuestions, showUsers } from "controller/questions/questions.controller"
import { streams } from "controller/questions/helpers"
import { store } from "index"
import { addQuestionsText } from "controller/questions/text"

export const onboard_questions = (): I.onboard_questions => {
  const state = store.getState()
  const { isMarried, hasChildren, changeRateAssumptions, changeRetirementAssumptions } = state.ui_reducer
  const q: I.question[] = []

  const askUser1 = onboardQuestions(q, "user1", addQuestionsText)
  const askUser2 = onboardQuestions(q, "user2", addQuestionsText)
  const show = showUsers(q, addQuestionsText)

  show.introduction()
  show.whatWeWillBuild()
  askUser1.for.name()
  askUser1.for.birthYear()
  askUser1.for.gender()
  askUser1.if.isMarried()
  if (isMarried) {
    askUser2.for.name()
    askUser2.for.birthYear()
    // askUser2.for.gender()
  }

  askUser1.if.theyHaveChildren()
  if (hasChildren) {
    askUser1.for.numberOfChildren()
  }

  askUser1.to.create.income()

  streams(state, "user1", "income").map((s, i) => {
    askUser1.for.income.name(i)
    askUser1.for.income.registration()
    askUser1.for.income.amount(i)
    askUser1.if.addAnother.income()
  })

  //show.incomeParagraph()

  if (isMarried) {
    askUser2.to.create.income()
    streams(state, "user2", "income").map((s, i) => {
      askUser2.for.income.name(i)
      askUser2.for.income.registration()
      askUser2.for.income.amount(i)
      askUser2.if.addAnother.income()
    })
    show.combinedIncomeChart()
  }

  askUser1.if.theyWantToChangeRateAssumptions()

  if (changeRateAssumptions) {
    askUser1.for.rate1()
    askUser1.for.rate2()
    askUser1.for.inflationRate()
    askUser1.for.managementExpenseRatio()
    askUser1.for.lifeSpan()
    if (isMarried) {
      askUser2.for.lifeSpan()
    }
  }
  show.assumptionsPanel()

  askUser1.if.theyWantToChangeRetirementAssumptions()
  if (changeRetirementAssumptions) {
    askUser1.for.rrspStartAge()
    askUser1.for.tfsaStartAge()
    askUser1.for.cppStartAge()
    if (isMarried) {
      askUser2.for.cppStartAge()
    }
    askUser1.for.oasStartAge()
    if (isMarried) {
      askUser2.for.oasStartAge()
    }
  }

  show.retirementAssumptionsPanel()

  askUser1.for.retIncome()
  show.targetIncomeChart(1)
  show.targetNestEgg(1)
  // show.targetIncomeChart(2)

  // askUser1.to.create.savings()

  // streams(state, "user1", "savings").map((s, i) => {
  //   askUser1.for.savings.currentValue()
  //   askUser1.for.savings.contributions(i)
  //   askUser1.for.savings.withdrawals(i)
  //   askUser1.for.savings.rates(i)
  // })

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

  const questions = q

  const add = buttons(questions)

  return {
    questions,
    nextButton: add.nextButton(),
    backButton: add.backButton(),
  }
}
