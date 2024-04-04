import { RcFile } from "antd/es/upload";
import { Moment } from "moment";

export interface EditMsaHandlertype {
  msaData: MsaDataType;
  msa_ref_id: string;

  msaEdited: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDateChange?: (
    date: Moment | null,
    dateString: string | string[]
  ) => void;
  handleEndDateChange?: (
    date: Moment | null,
    dateString: string | string[]
  ) => void;
  beforeUpload: (file: RcFile) => boolean;
  SubmitEditMsa: React.MouseEventHandler<HTMLElement> | undefined;
  handleEditMsa: () => void;
  isModalVisible: boolean;
  handleCancel: () => void;
  validateStartDate: (value: any) => Promise<void>;
  fileCancel: () => void;
  showFile: boolean;
  handleFileUpload: (info: any) => void;
  fileName: string | undefined;
  isFormFilled?: () => false | "date" | "field";
  validateRegion: (value: any) => Promise<void>;
  validateClientName: (value: any) => Promise<void>;
  spinning: boolean;
}
export interface LocationStateProps {
  msa_ref_id: string;
}

export interface MsaDataType {
  client_name: string;
  region: string;
  start_date: string;
  end_date: string;
  comments: string;
  msa_doclink: string;
  file?: RcFile | null;
}
