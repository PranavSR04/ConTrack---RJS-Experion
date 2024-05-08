import { DebouncedFunc } from "lodash";

export interface ManageUsersPropType {
  handleAddUser: () => void;
  handleAddGroup: () => void
  showDeleteConfirmation: (record: User) => void;
  displayGroupsModal:()=>void;
  hideGroupsModal: () => void;
  isGroupModalVisible: boolean
  setDeleteConfirmationVisible: React.Dispatch<React.SetStateAction<boolean>>;
  hideDeleteConfirmation: () => void;
  groupOptions:GroupOptions[]
  completeUserList: User[]
  getFullUsersList: (search:string) => Promise<void>
  handleDelete: (selectedUser: User) => Promise<void>;
  setDataSource: React.Dispatch<React.SetStateAction<User[]>>;
  handleSearch: (value: string) => void;
  handleSelectedGroups: (selectedUserGroups:number[]) => void;
  addUsersToGroup:(selectedUsers:number[]) => void;
  handleAddGroupModalCancel:()=>void;

  showDeleteFromGroupModal:boolean
  // selectedIndividualGroup:number;
  handleDeleteFromGroup: () => Promise<void>;
  cancelDeleteFromGroupModal: () => void;
  handleUserSearch:(search:string)=>void;
  handleIndividualGroup:(selectedIndividualGroup:number|undefined) => void;
  handleAddUsersToGroup:() => void;
  groupUsersData: User[]
  selectedEmployee:EmployeeOption|undefined;
  selectedUserGroups:number[]
  selectedUsers:number[]
  // selectedUsers:number[]
  setUserUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteFromGroup: (record: User) => void
  showUpdateChoice: (record: User) => void;
  handlePageChange: (pagination: any) => void;
  handleEditModalCancel: () => void;
  handleDeleteGroup: (selectedIndividualGroup:number|undefined) =>  Promise<void>;
  handleDeleteGroupModal: () => void;
  cancelDeleteGroupModal: () => void;
  setSelectedEmployeeId: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedEmployeeId?:number|null;
  // setSelectedEmployeeId:number | undefined;
  handleUpdateUser: (selectedRoleId: number | undefined) => Promise<void>;
  rowClassName: (record: User, index: number) => string;
  debouncedFetchData: DebouncedFunc<(searchValue: string) => Promise<void>>;
  onSelectEmployee: (data: EmployeeOption | null) => void;
  getEmployee: (value: string) => void;
  setDropdownOptions: React.Dispatch<
    React.SetStateAction<
      {
        label:string
        value: number;
      }[]
    >
  >;
  setSelectedRoleId: React.Dispatch<React.SetStateAction<number | undefined>>;
  columns: TableColumn[];
  individualGroupColumns:TableColumn[];
  dropdownOptions: {
   label: string;
   value: number;
}[]
   roleOptions: RoleOption[]
   dataSource: User[]
   pagination: {
      current: number;
      pageSize: number;
      total: number;
  }
  addGroupToSystem: (groupName: string) => void
  editModalVisible: boolean
  addGroupModalVisible:boolean
  selectedRoleId: number | undefined
  deleteConfirmationVisible: boolean
  selectedUser: User | null
  loading: boolean
  userAdded:boolean
  userUpdated:boolean
  userDeleted:boolean
  showToast:boolean
  selectedIndividualGroup:number | undefined

  showDeleteGroupModal:boolean
  
  emptyUserToast:boolean
  employeeNotFoundToast:boolean
  dropDownLoading:boolean
  userDropDownLoading:boolean
  failedToAddUsersToGroup:boolean
  groupAdded:boolean
  failedToAddGroup: boolean
  addGroupModalVisible:boolean
  addGroupToSystem: (groupName: string) => void
  handleAddGroup: () => void


 
}


export interface ManageUserHandlerPropType {}

export interface User {
  id: number;
  user_name: string;
  role_access: string;
  contracts_count: number;
  group_names:string
}

export interface GroupOptions {
  id: number;
  group_name: string;
}

export interface Employee {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
}

export interface TableColumn {
  title: JSX.Element;
  dataIndex: string;
  sorter?: false | ((a: any, b: any) => number);
  width?: number | undefined;
  ellipsis?:boolean | undefined
}

export interface ActionColumn {
  title: JSX.Element;
  dataIndex: string;
  render: (_: any, record: User) => JSX.Element;
}

export interface RoleOption {
  value: number;
  label: string;
}

export interface EmployeeOption {
  value: number;
  label: string;
}

export interface DeleteConfirmationProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName: string;
}

export interface UpdateModalProps {
  visible: boolean;
  onCancel: () => void;
  updateUser: () => void;
}

export interface AddGroupModalProps{
  visible: boolean;
  onCancel: () => void;
}

