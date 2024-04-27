import { AxiosError } from "axios";
import { MsaApiType } from "../../types";

export interface HeaderHandlerPropType {
    responses: MsaApiType | AxiosError<unknown, any> | undefined;
    id: string;
  }
  export interface HeadingHandlerType {
    getMsaHeading: (responses: any) => void;
  }

  export interface HeaderPropType {
    msaRefId: string;
    clientName: string;
    ROLE_ID: number;
    msaExcelData: (string | number)[][];
    msaStatus:number;
    navigateToEditMsa: (id: string) => void;
    navigateToRenewMsa: (id: string) => void;
    loading:boolean
    id: string
  }
  