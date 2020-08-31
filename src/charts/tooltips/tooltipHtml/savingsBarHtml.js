import { round, formatIncomeName, formatCurrency } from "charts/createChartFunctions/chartHelpers"

export const savingsBarHtml = (d, dataObject, n, state) => {


  const { selectedUser } = state.ui_reducer
  const { user1BirthYear, user1Name, user2Name } = state.ui_reducer
  const name = n[0].parentNode.className.animVal

  const thisColor = "red"
  return  `
                                    <div class="topHeader">
                                        <p> $          1000</p>
                                        <p> Age:           1000</p>
                                    </div>
                                    <div class="title-row" style="color: ${thisColor}; ">
                                     ${          1000}
                                    </div>
                                    <div class="row" style="color: ${thisColor}; ">
                                      <div class="box">
                                        <p> Before tax</p>
                                        <p class="value"> ${
                                          1000
                                        } K</p>
                                      </div>
                                      <div class="box">
                                        <p> After tax</p>
                                        <p class="value"> ${
                                          1000
                                        } K</p>
                                      </div>
                                    </div>
                                    <div class="title-row">
                                    Total
                                    </div>
                                    <div class="row">
                                      <div class="box">
                                        <p> Before tax</p>
                                        <p class="value"> ${
                                          1000
                                        } K</p>
                                      </div>
                                      <div class="box">
                                        <p> After tax</p>
                                        <p class="value"> ${
                                       1000
                                        } K</p>
                                      </div>
                                    </div>
                                    `
  
}