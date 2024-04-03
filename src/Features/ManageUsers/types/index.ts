import { DebouncedFunc } from "lodash";

export interface ManageUsersPropType {
  handleAddUser: () => void;
  showDeleteConfirmation: (record: User) => void;
  setDeleteConfirmationVisible: React.Dispatch<React.SetStateAction<boolean>>;
  hideDeleteConfirmation: () => void;
  handleDelete: (selectedUser: User) => Promise<void>;
  setDataSource: React.Dispatch<React.SetStateAction<User[]>>;
  handleSearch: (value: string) => void;
  setUserUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  showUpdateChoice: (record: User) => void;
  handlePageChange: (pagination: any) => void;
  handleEditModalCancel: () => void;
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
  editModalVisible: boolean
  selectedRoleId: number | undefined
  deleteConfirmationVisible: boolean
  selectedUser: User | null
  loading: boolean
  userAdded:boolean
  userUpdated:boolean
  userDeleted:boolean
  showToast:boolean
  emptyUserToast:boolean
  employeeNotFoundToast:boolean
  dropDownLoading:boolean
 
}

export interface ManageUserHandlerPropType {}

export interface User {
  id: number;
  user_name: string;
  role_access: string;
  contracts_count: number;
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
