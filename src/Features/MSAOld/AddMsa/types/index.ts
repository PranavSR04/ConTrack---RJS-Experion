import { RcFile } from "antd/es/upload";
import { Moment } from "moment";

export interface MsaDataType {
  msa_ref_id: string;
  client_name: string;
  region: string;
  start_date: string;
  end_date: string;
  file: File;
  comments?: string;
}
export interface AddMsaPropsType {
  msaRefId: string | undefined;
  fileName: string | undefined;
  msaAdded: boolean;
  handleFileUpload: (info: any) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDateChange: (
    date: Moment | null,
    dateString: string | string[]
  ) => void;
  handleEndDateChange: (
    date: Moment | null,
    dateString: string | string[]
  ) => void;
  handleAddMsa: () => void;
  isModalVisible: boolean;
  handleCancel: () => void;
  validateStartDate: (value: any) => Promise<void>;
  handleOk: () => Promise<void>;
  start_date: string | undefined;
  date_validate: boolean;
  spinning: boolean;
  beforeUpload: (file: RcFile) => boolean;
}

export interface GenerateMsaIdResponse {
  exists: boolean;
}
