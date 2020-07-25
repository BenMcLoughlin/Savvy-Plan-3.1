// const puppeteer = require("puppeteer")

// jest.setTimeout(100000)

// test("h2 loads correctly", async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     //no sandax
//     slowMo: 50 // slow down by 250ms
//   })
//   const page = await browser.newPage()

//   await page.setViewport({ width: 1231, height: 1009 })

//   await page.goto("http://localhost:3000/onboarding")

//   //await page.waitForSelector(".sc-fzooss #button")
//   await page.click("button#button") // Introduction "Lets build you a financial Plan", clicks button to proceed
//   await page.click("input#textInput") //First Name "What's your first Name?"
//   await page.waitFor(1000)

//   //await page.waitForSelector("div #textInput")
//   await page.type("input#textInput", "Ben") // Types in first name
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div #textInput")
//   await page.click("input#textInput") //BirthYear "What's your Birth Year?"
//   await page.type("input#textInput", "1988") // Types in birthYear
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector(".sc-pZaHX > .sc-fzooss > .sc-fzpans > #nextButton > path:nth-child(2)")
//   await page.click("div#male") //Gender "What's your Gender?" selects male
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div #married")
//   await page.click("div#married") //Marital Status "What's your Marital Status?" selects male
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div #textInput")
//   await page.type("input#textInput", "Kelsey") // Types in spouses first name
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div #textInput")
//   await page.click("input#textInput") //BirthYear "What's your Birth Year?"
//   await page.type("input#textInput", "1989") // Types in spouses birthYear
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div #no")
//   await page.click("div#no")
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector(".sc-fzooss #button")
//   await page.click("button#button") // We need some details about your income.
//   await page.waitFor(1000)

//   //await page.waitForSelector("input#textInput")
//   await page.click("input#textInput") //Where does this income come from?
//   await page.type("input#textInput", "Wal Mart Income") // Types in income type
//   await page.waitFor(1000)
//   await page.click("#nextButton") //next page

//   //await page.waitForSelector("div #regularEmployment")
//   await page.click("div #regularEmployment") //Income Registrations
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div > .sc-fznJRM > .sc-fznOgF > .sc-fznYue > .iNiJRO")
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)
  
//   //await page.waitForSelector("div #yes")
//   await page.click("div#yes") //Add Spouse Income
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("input#textInput") //Where does this income come from?"
//   await page.click("input#textInput") //Where does this income come from?"
//   await page.type("input#textInput", "Counselling Income") // Types in income type
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div #businessIncome")
//   await page.click("div #regularEmployment") //Income Registrations
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   await page.click(".sc-pZaHX > .sc-fzooss > .sc-fzpans > #nextButton > path:nth-child(2)") //Income Input for spouse await page.waitFor(1000)

//   //await page.waitForSelector("#nextButton")
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div#tfsa")
//   await page.click("div#tfsa") //Add Spouse Income
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("#nextButton")
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   await page.click("div#yes") //Add Property
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   await page.click("input#textInput") //Where does this income come from?"
//   await page.type("input#textInput", "Primary Residence") // Types in income type
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   //await page.waitForSelector("div #primaryResidence")
//   await page.click("div #regularEmployment") //Income Registrations
//   await page.click("#nextButton") //next page
//   await page.waitFor(1000)

//   browser.close()
// })

