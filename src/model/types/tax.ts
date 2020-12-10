export interface taxBracket {
  bot: number
  top: number
  rate: number
  constant: number
}

export interface craValues {
  [key: string]: {
    [key: string]: number
  }
}

export interface taxBrackets {
  [key: number]: taxBracket
}

export type government = "federal" | "britishColumbia"


export type basicPersonal = 12298 | 10949

export interface taxes {
  [key: string]: {
    basicPersonal: basicPersonal
    [key: number]: taxBracket
  }
}
