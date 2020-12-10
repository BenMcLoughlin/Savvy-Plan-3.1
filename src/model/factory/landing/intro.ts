import * as format from "model/utils/charts/format"

/** intro 
* This is the first page the user sees when they arrive at savvyplan.ca
* it contains a chart with example data of someone who has a financial plan 
 *@param 
 *@returns 
**/ 
  
class Show {
  components = []
  H1() {
      this.components.push({
        component: "H1"
      })
      return this
  }

  thatSays() {
    console.log('hi')
    return this
  }

  }


export const intro = () => ({
  chartName: "landing",
  chartType: "area",
  getChartData: format.landing,
  h1: "See your financial Future",
  button: {
    label: "get started",
    handleChange: () => null,
  },
  component: "H1", 
  // components: [
  //   {
  //     component: 'Chart'
  //   },
  //   {
  //     component: 'H1'
  //   },
  //   {
  //    component: 'Button'
  //   },
  //   {
  //     component: 'H2'
  //   },
  //   {
  //     component:'Card'
  //   }
  // ]
})


const example = `
   
show.inTopSection().H1().thatSays('see your financial future).left(20).top(30)
show.chart().named('intro')


`