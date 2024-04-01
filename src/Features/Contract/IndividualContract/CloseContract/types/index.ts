import { AxiosError } from "axios";
import { ContractApiType } from "../../types";

export interface CloseContractHandlerType{
    responses: ContractApiType | AxiosError<unknown, any>| undefined;
    getContractStatus: (responses: any) => void;
    id: string
}

export interface CloseContractHandlerPropType{
    responses: ContractApiType | AxiosError<unknown, any>| undefined;
    id: string
}

export interface CloseContractPropType{
    visible: boolean;
    onCancel: ()=>void;
    closeContract:()=>void;
    modalPopUp: () => void;
    contractStatus: string
}

export interface CloseContractModalPropType{
    visible: boolean;
    onCancel: ()=>void;
    closeContract:()=>void;
}