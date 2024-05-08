import { MSADataInitial, MSAType } from "../../MSA/types";

export interface EditMsaPropType{
    msa_id: number;
    initialValues: MSADataInitial | undefined;
    msaData: MSAType | undefined
    msaEdited: boolean
}