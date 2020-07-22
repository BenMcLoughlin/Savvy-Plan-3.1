export type reg =
  | "employment"
  | "business Income"
  | "Investment Income"
  | "Rental Income"
  | "Primary Residence"
  | "Vacation Property"
  | "Rental Property"
  | "Business"
  | "Other"
  | "Credit Card"
  | "Student Loan"
  | "Line of Credit"
  | "Business loan"
  | "Other"
  | "TFSA"
  | "RRSP"
  | "Personal"
  | "Pension"
  | "RESP"
  | ""

export type owner = "user1" | "user2"

export type user = "user1" | "user2" | "combined"

export type streamType = "income" | "savings" | "property" | "spending" | "debt"

export type chartType = "IncomeChart" | "SavingsChart" | "PropertyChart" | "SpendingChart" | "DebtChart"

export type parent = "onboard" | "display"
