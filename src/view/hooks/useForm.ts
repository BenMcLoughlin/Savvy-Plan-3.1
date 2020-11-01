import { ChangeEvent } from "react"
import { useState } from "react"
import * as I from "model/types"

export const useForm = (...args: string[]): I.useForm => {
  const [formData, setFormData] = useState<I.formData>(args.reduce((a, n) => ({ ...a, [n]: "ben@hotmail.com" }), {}))

  const setForm = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return { formData, setForm }
}
