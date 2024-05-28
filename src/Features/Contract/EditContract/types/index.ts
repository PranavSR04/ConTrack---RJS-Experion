import { AddContractValueType, ContractType, EditContractValueType } from "../../../../Components/ContractForm/types";


export interface EditContractPropType{
    contract_id: number;
    contractDetails: ContractType | undefined;
    initialValues: EditContractValueType | AddContractValueType;
}