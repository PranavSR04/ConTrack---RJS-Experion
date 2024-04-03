import dayjs from "dayjs";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { ContractDetails, ExistingMilestone } from ".";

export interface RcFile extends File {
  uid: string;
}

export interface Milestone {
  milestones: string | null;
  expectedCompletionDate: Date | null;
  percentage?: number | null;
  amount: number | null;
}

export interface EditContractDetails {
  msa_id: string;
  client_name: string;
  contract_ref_id: string;
  region: string;
  du: string;
  start_date: string;
  end_date: string;
  date_of_signature: string;
  contract_type: "FF" | "TM";
  milestones: ExistingMilestone[];
  associatedMembers: string[];
  file: RcFile | null;
  comments: string | null;
  estimated_amount: number | null;
  contract_added_by: number;
}

export interface ContractPropType {
  contractAdded: boolean;
  contractType: string | null;
  selectClient: (value: string) => Promise<void>;
  handleMilestoneChange: (
    index: number,
    field: string,
    value: string | dayjs.Dayjs | number | null
  ) => void;
  handleSubmit: () => Promise<void>;
  handleFileUpload: (info: UploadRequestOption<any>) => void;
  handleCommentsRemarksChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleTotalContractValueChange: (value: number | null) => void;
  handlePaymentPercentageChange: (
    index: number,
    value: number | undefined
  ) => void;
  handleAmount: (paymentamount: number | null) => void;
  removeMilestone: (index: number) => void;
  handleAddMilestone: () => void;
  handleContractTypeChange: (value: "FF" | "TM") => void;
  getClientName: (searchValue: string) => Promise<void>;
  clientNameOptions: {
    value: string;
  }[];
  contractDetails: ContractDetails;
  setContractDetails: React.Dispatch<React.SetStateAction<EditContractDetails>>;
  milestones: Milestone[];
}

export interface LocationStateProps {
  id: string;
}

export interface EditContractPropType {
  contractAdded: boolean;
  contractType: string | null;
  spinning: boolean;
  selectClient: (value: string) => Promise<void>;
  handleMilestoneChange: (
    index: number,
    field: string,
    value: string | dayjs.Dayjs | number | null
  ) => void;
  handleFileUpload: (info: UploadRequestOption<any>) => void;
  handleCommentsRemarksChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleTotalContractValueChange: (value: number | null) => void;
  handlePaymentPercentageChange: (
    index: number,
    value: number | undefined
  ) => void;
  handleAmount: (paymentamount: number | null) => void;
  removeMilestone: (index: number) => void;
  handleAddMilestone: () => void;
  handleContractTypeChange: (value: "FF" | "TM") => void;
  getClientName: (searchValue: string) => Promise<void>;
  clientNameOptions: {
    value: string;
  }[];
  contractDetails: ContractDetails;
  setContractDetails: React.Dispatch<React.SetStateAction<ContractDetails>>;
  milestones: Milestone[];
  handleUpdate?: () => Promise<void>;
}
