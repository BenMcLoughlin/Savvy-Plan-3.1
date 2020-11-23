import { merge } from "model/utils/index"
import * as I from "model/types"

export const add = (target: I.objects, source: I.objects): I.objects => merge({}, target, source)
