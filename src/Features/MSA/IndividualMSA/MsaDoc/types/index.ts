import { AxiosError } from "axios"
import { MsaApiType } from "../../types"

export interface MsaDocs {
  msa_doclink: string |undefined, 
  start_date: string |undefined,
  end_date: string |undefined
}

export interface MsaDocPropType {
  response?:any
}