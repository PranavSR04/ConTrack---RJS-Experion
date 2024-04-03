import dayjs from "dayjs";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { EditContractDetails } from "./editcontract";

export interface RcFile extends File {
  uid: string;
}

export interface Milestone {
  milestones: string | null;
  expectedCompletionDate: string;
  percentage?: number | null;
  amount: number | null;
}

export interface ContractDetails {
  msa_id: string;
  clientName: string;
  contract_ref_id: string;
  region: string;
  du: string;
  start_date: string;
  end_date: string;
  date_of_signature: string;
  contract_type: "FF" | "TM";
  milestone: Milestone[];
  assoc_users: [{ user_id: number }] | [];
  file: RcFile | null;
  comments: string;
  estimated_amount: number;
  contract_added_by: number;
}

export interface AssociatedMember {
  username: string;
  user_id: number;
}

export interface AddContractPropType {
  contractAdded: boolean;
  contractType: string | null;
  spinning: boolean;
  selectClient: (value: string) => Promise<void>;
  userNameOptions: AssociatedMember[];
  selectUser: (data: AssociatedMember) => void;
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
  getUserName: (searchValue: string) => Promise<void>;
  contractDetails: ContractDetails;
  setContractDetails: React.Dispatch<React.SetStateAction<ContractDetails>>;
  milestones: Milestone[];
}

export interface LocationStateProps {
  id: string;
}

export interface EditContractPropType {
  contractEdited: boolean;
  contractType: string | null;
  selectClient: (value: string) => Promise<void>;
  handleMilestoneChange: (
    index: number,
    field: string,
    value: string | dayjs.Dayjs | number | null
  ) => void;
  spinning: boolean;
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
  contractDetails: EditContractDetails;
  setContractDetails: React.Dispatch<React.SetStateAction<EditContractDetails>>;
  milestones: ExistingMilestone[];
  handleUpdate?: () => Promise<void>;
  existingMilestone: ExistingMilestone[] | undefined;
}

export interface ExistingMilestone {
  milestone_desc: string | null;
  milestone_enddate: Date | null;
  percentage?: number | null;
  amount: number | null;
}
