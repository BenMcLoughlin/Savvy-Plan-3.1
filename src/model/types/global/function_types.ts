import * as I from "model/types"

export type set = (reducer: string, value: I.objects) => void

export type remove = (id: string, reducer?) => void
