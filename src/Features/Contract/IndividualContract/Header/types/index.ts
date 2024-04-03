import { AxiosError } from "axios";
import { ContractApiType } from "../../types";

export interface HeaderHandlerPropType {
  responses: ContractApiType | AxiosError<unknown, any> | undefined;
  id: string;
}

export interface HeadingHandlerType {
  getContractHeading: (responses: any) => void;
}

export interface HeaderPropType {
  contractRefId: string;
  clientName: string;
  ROLE_ID: number;
  contractExcelData: (string | number)[][];
  contractType: string;
  du: string;
  contractStatus: string;
  navigateToEditContract: (id: string) => void;
  id: string
}

export interface HandlerPropType {
  responses: ContractApiType | AxiosError<unknown, any> | undefined;
  loading: boolean;
}
