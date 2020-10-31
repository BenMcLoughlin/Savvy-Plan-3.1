import { ChangeEvent } from "react"

export interface formData {
  [key: string]: string
}

export interface useForm {
  formData: formData
  setForm: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface stringObject {
  [key: string]: string
}

export interface sendRequestRes {
  token: string
}

export type sendRequest = (url: string, method: string, body: string, headers: stringObject) => Promise<sendRequestRes>

export interface useHttpClient {
  sendRequest: sendRequest
}
