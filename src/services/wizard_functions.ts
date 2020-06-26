import * as arrayCreators from "data/wizard"
import _ from "lodash"

export const addInstanceArray = (main_reducer, query, remove, set, state, streamType, wizardArray) => {
  const createArray = arrayCreators[`create${_.startCase(streamType)}Array`]

  Object.values(main_reducer)
    .filter((d: any) => d.id.includes(query))
    .map((instance: any) => {
      //looks at all the income streams listed in the main reducer
      const incomeData = createArray(instance, set, state, remove) //creates an wizardArray for each income incomeStream, enabling the user to change individual details in the wizard
      return incomeData.wizardArray.map((d: any, i: number) => {
        //maps through the wizardArray and pushes the contents to the main wizardArray that controls the wizard
        wizardArray.push(d)
      })
    })
}


export const savingsAccountsArray = [
  {
    label: "tax free savings account",
    reg: "TFSA",
    info:
      "The TFSa enables you to  avoid taxes on the gains you make. If you invest $100 right now and it becomes $1000 by the time you retire, that $900 you'll have earned is tax-free. You can also take money out any time you want. There is no penalty to withdraw - and if you do, the amount is added to how much you can contribute the following year.",
  },
  {
    label: "registered retirement savings",
    reg: "RRSP",
    info:
      "A popular retirement account designed to help Canadians save for retirement. The money you contribute to your RRSP is “pre-tax.” That means that you can subtract the amount you contribute from your income and pay less in income taxes. If you made $60,000 and you contributed $5,000 to your RRSP, you will pay tax on only $55,000 of income.",
  },
  {
    label: "personal, nopersonalistered",
    reg: "Personal",
    info:
      "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
  },
  {
    label: "Locked in Retirement Account",
    reg: "LIRA",
    info:
      "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
  },
  {
    label: "Pension",
    reg: "Pension",
    info:
      "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
  },
  {
    label: "RESP",
    reg: "RESP",
    info:
      "A popular savings account for parents or family members to save money for their children's education. With an RESP, the government will match your contributions and anything you earn through investing is earned tax-free. As always, there are rules and limitations.",
  },
  { label: "none", reg: "none" },
]