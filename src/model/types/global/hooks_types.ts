import { ChangeEvent } from "react"



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
