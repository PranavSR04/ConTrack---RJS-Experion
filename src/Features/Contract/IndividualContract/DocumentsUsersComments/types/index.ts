import { Addendum } from "../../types";

export interface DocumentsUsersCommentsPropType {
  loading: boolean;
  contractDocuments: string;
  contractRefId: string;
  clientName: string;
  addendums: Addendum[];
  comments: string;
  associatedUsers: AssociatedUsersType[];
  associatedGroups: AssociatedGroupsType[];
}

export interface DocumentsUsersCommentsHandlerType {
  getContractDocuments: (responses: any) => void;
}

export interface AssociatedUsersType {
  id: number;
  contract_id: number;
  user_name: string;
  user_mail: string;
  user_id: number;
}

export interface AssociatedGroupsType {
  id: number;
  contract_id: number;
  group_name: string;
}
