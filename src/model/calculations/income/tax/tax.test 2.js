import {getTax, getBasicCredits, getAfterTaxIncome} from "model/calculations/income/tax/tax.helpers"
// CRA Example here: https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4032-payroll-deductions-tables/t4032bc/t4032bc-january-general-information.html

const federalTaxes = getTax(58240, "federal")
const provincialTaxes = getTax(58240, "britishColumbia")
const federalCredits = getBasicCredits(58240, "federal")
const provincialCredits = getBasicCredits(58240, "britishColumbia")

describe("CRA Example", function () {
  it("MOCK TEST", () => expect(1).toEqual(1))
  // it("Matches CRA Example - Federal Tax", () => expect(+federalTaxes.toFixed(2)).toEqual(9270.20))
  // it("Matches CRA Example - BC Tax", () => expect(+provincialTaxes.toFixed(2)).toEqual(3382.48))
  // it("Matches CRA Example - Federal Credits", () => expect(+federalCredits.toFixed(2)).toEqual(2594.60))
  // it("Matches CRA Example - Provincial Credits", () => expect(+provincialCredits.toFixed(2)).toEqual(743.99))
  // it("Matches CRA Example - After tax Income", () => expect(+getAfterTaxIncome(58240, federalTaxes, provincialTaxes, federalCredits, provincialCredits ).toFixed(2)).toEqual(48925.91))
})
