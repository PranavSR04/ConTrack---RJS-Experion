import { ContractType } from "../../../../Components/ContractForm/types";

export interface AddContractPropType {
    addContract: (contractData: ContractType) => Promise<void>;
    initialValues: { milestones: {}[];}
}