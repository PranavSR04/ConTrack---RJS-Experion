import React from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UpdateModal from "./UpdateModal";
import AddGroupModal from "./AddGroupModal";
import AddGroupModal from "./AddGroupModal";
import userTableStyles from "./ManageUsers.module.css";
import {
  Table,
  Spin,
  Modal,
  message,
  Input,
  Button,
  Select,
  AutoComplete,
  TablePaginationConfig,
  PaginationProps,
  Card,
} from "antd";
import { ManageUserHandlerPropType, ManageUsersPropType, User } from "./types";
import Toast from "../../Components/Toast/Toast";
import { LabeledValue } from "antd/es/select";
// import BreadCrumbs from "../../Components/BreadCrumbs/Breadcrumbs";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

const ManageUsers = ({
  handleAddUser,
  handleAddGroup,
  hideDeleteConfirmation,
  handleDelete,
  handleSearch,
  handlePageChange,
  handleEditModalCancel,
  handleAddGroupModalCancel,
  handleUpdateUser,
  rowClassName,
  debouncedFetchData,
  onSelectEmployee,
  groupOptions,
  completeUserList,
  getEmployee,
  setSelectedEmployeeId,
  setSelectedRoleId,
  handleSelectedGroups,
  isGroupModalVisible,
  columns,
  dropdownOptions,
  roleOptions,
  dataSource,
  pagination,
  addGroupModalVisible,
  editModalVisible,
  selectedRoleId,
  deleteConfirmationVisible,
  selectedUser,
  userAdded,
  loading,
  userUpdated,
  userDeleted,
  showToast,
  emptyUserToast,
  employeeNotFoundToast,
  selectedEmployeeId,
  dropDownLoading,
  userDropDownLoading,
  displayGroupsModal,
  hideGroupsModal,
  handleIndividualGroup,
  individualGroupColumns,
  groupUsersData,
  getFullUsersList,
  addUsersToGroup,
  handleAddUsersToGroup,
  handleDeleteFromGroup,
  showDeleteFromGroupModal,
  cancelDeleteFromGroupModal,
  handleUserSearch,
  selectedEmployee,
  selectedUserGroups,
  selectedUsers,
  failedToAddUsersToGroup,
  selectedIndividualGroup,
  showDeleteGroupModal,
  handleDeleteGroup,
  handleDeleteGroupModal,
  cancelDeleteGroupModal,
  addGroupToSystem,
  groupAdded,
  failedToAddGroup,
  handleAddGroup,
  handleAddGroupModalCancel,
  addGroupModalVisible

  // selectedUsers
  // selectedIndividualGroup

}: // handleClear

ManageUsersPropType) => {

  console.log("OPTIONS LIST FROM HANDLE AFTER KEYPRESS",completeUserList)

  return (
    <>
      {/* <BreadCrumbs
        style={{
          fontSize: 17,
          // color: "red !important",
          fontStyle: "italic",
          marginLeft: "15rem",
        }}
      /> */}
      <h2 className={`${userTableStyles.pageTitle}`}>MANAGE USER</h2>
      <div className={` ${userTableStyles.wholeTable} `}>
        <div className={`${userTableStyles.searchEmployeeCluster}`}>


          <Select
            className={`${userTableStyles.searchEmployeeBox}`}
            // style={{ width: 200 }}
            options={dropdownOptions}
            allowClear
            value={selectedEmployee}
            // autoFocus={true}
            placeholder="Search Employee"
            // onChange={(value, option) => setSelectedEmployeeId(value?.value)}
            onChange={onSelectEmployee}
            filterOption={false}
            labelInValue={true}
            showSearch
            onSearch={(text) => {
              // getEmployee(text);
              debouncedFetchData(text);
            }}
            notFoundContent={
              dropDownLoading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 15 }} spin />}
                />
              ) : null
            }
          />

          <Select
            className={`${userTableStyles.viewAccessBox}`}
            options={roleOptions}
            value={selectedRoleId}
            style={{ width: 200 }}
            onSelect={(value) => setSelectedRoleId(value as number)}
            placeholder="Select a role"
            allowClear
          />

          <Select
            className={`${userTableStyles.viewGroupsBox}`}
            style={{ width: 300 }}
            mode="multiple"
                allowClear
                value={selectedUserGroups}
                // style={{ width: '100%' }}
                options={groupOptions}
                placeholder="Please select"
                // defaultValue={['a10', 'c12']}
                onChange={handleSelectedGroups}
                showSearch={false}
                // options={groupOptions}
                maxTagCount={"responsive"}
                // dropdownStyle={{maxHeight: 50, overflowY: 'scroll' }}
                virtual={false}


              />

          <Button
            className={`${userTableStyles.addUserButton}`}
            onClick={() => {
              handleAddUser();
            }}
          >
            ADD USER
          </Button>

          <Button
            className={`${userTableStyles.addGroupButton}`}
            onClick={() => handleAddGroup()}
          >
            + NEW GROUP
          </Button>
        </div>

        
        {userAdded ? (
          <Toast message={"User Added Successfully"} messageType={"success"} />
        ) : (
          <></>
        )}
        {userUpdated ? (
          <Toast
            message={"User Updated Successfully"}
            messageType={"success"}
          />
        ) : (
          <></>
        )} 
         {userDeleted ? (
          <Toast
            message={"User Deleted Successfully"}
            messageType={"warning"}
          />
        ) : (
          <></>
        )}
        {showToast && (
          <Toast message="User Already Exists" messageType="error" />
        )}
        {emptyUserToast && (
          <Toast message="No User Found" messageType="error" />
        )}
        {employeeNotFoundToast && (
          <Toast message="No Employee Found" messageType="error" />
        )} 

        {groupAdded && (<Toast message="Group added successfully" messageType="success" />)} 
        {failedToAddGroup && (<Toast message="Such a group already exists" messageType="error" />)} 



        <div className={`${userTableStyles.mainListContainer}`}>
          <Input
            className={`${userTableStyles.searchUserBox}`}
            placeholder="Search User... "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
          />

          <Button
            className={`${userTableStyles.viewGroupsButton}`}
            onClick={displayGroupsModal}
          >
            View Groups
          </Button>

          <Button
            className={`${userTableStyles.addGroupButton}`}
            onClick={() => handleAddGroup()}
          >
                      + New Group
          </Button>


          <Table
            className={`${userTableStyles.userListTable}`}
            columns={columns}
            size="small"
            dataSource={dataSource}
            rowClassName={rowClassName}
            locale={{ emptyText: " " }}
            pagination={{
              position: ["bottomCenter"],
              ...pagination,
              itemRender: (current, type, originalElement) => {
                if (type === "page") {
                  return (
                    <a
                      style={{
                        background:
                          current === pagination.current ? "#DC143C" : "",
                        color: current === pagination.current ? "white" : "",
                        borderBlockColor: "#DC143C",
                        border: "none",
                      }}
                    >
                      {current}
                    </a>
                  );
                }
                return originalElement;
              },
            }}
            onChange={handlePageChange}
            loading={{
              indicator: (
                <div>
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 30 }} spin />
                    }
                  />
                </div>
              ),
              spinning: loading,
            }}
            // }
          />
        </div>
      </div>

      <Modal
      // title="View Groups"
      open={isGroupModalVisible}
      // onOk={handleOk}
      onCancel={hideGroupsModal}
      width={'75%'}  // Optional: adjust width based on content needs
      // height={800}
      footer={null}  // Hides the default footer buttons
      

    >
      {failedToAddUsersToGroup && (<Toast message="Please select both group and users" messageType="error" /> )}

      <Select
            className={`${userTableStyles.viewGroupsBox}`}
            style={{ width: '20%' }}
            // mode="multiple"
                allowClear
                // style={{ width: '100%' }}
                options={groupOptions}
                value={selectedIndividualGroup}
                placeholder="Please select"
                onChange={handleIndividualGroup}
              />

      <Select
            className={`${userTableStyles.viewGroupsBox}`}
            // key={completeUserList.length}
            options={completeUserList}
            placeholder="Please select users to add"
            onChange={(value)=>{addUsersToGroup(value)}}
            filterOption={false}
            labelInValue={false}
            maxTagCount={"responsive"}
            style={{ width: '50%' }}
            mode="multiple"
            showSearch
            allowClear
            value={selectedUsers}
            onSearch={(search)=>{
                handleUserSearch(search);
              }}
              notFoundContent={
                userDropDownLoading ? (
                  <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 15 }} spin />}
                  />
                ) : null
              }
              />
          
          <Button
            className={`${userTableStyles.viewGroupsButton}`}
            // onClick={()=>handleAddUsersToGroup(selectedIndividualGroup,selectedUsers)}
            onClick={handleAddUsersToGroup}
          >
            Add Users
          </Button>

        { selectedIndividualGroup && <Button
            className={`${userTableStyles.deleteGroupIcon}`}
            // onClick={()=>handleAddUsersToGroup(selectedIndividualGroup,selectedUsers)}
            onClick={handleDeleteGroupModal}
          
          >
                
                  
                    {
                      <DeleteOutlined style={{ fontSize: 15 }} />
                    }

                    {
                    }
                     
                {/* <p>Delete Group</p> */}
    
          </Button>}

          <Modal
              open={showDeleteGroupModal}
              onCancel={cancelDeleteGroupModal}
              title="Do you really wish to delete this group?"            
              onOk={()=>handleDeleteGroup(selectedIndividualGroup)}
              style={{marginTop:30}}
            />

         <Table
            className={`${userTableStyles.userListTable}`}
            columns={individualGroupColumns}
            size="small"
            dataSource={groupUsersData}
            rowClassName={rowClassName}

            locale={{ emptyText: "Please select a group" }}
            pagination={{
              position: ["bottomCenter"],
              ...pagination,
              itemRender: (current, type, originalElement) => {
                if (type === "page") {
                  return (
                    <a
                      style={{
                        background:
                          current === pagination.current ? "#DC143C" : "",
                        color: current === pagination.current ? "white" : "",
                        borderBlockColor: "#DC143C",
                        border: "none",
                      }}
                    >
                      {current}
                    </a>
                  );
                }
                return originalElement;
              },
            }}
            onChange={handlePageChange}
            loading={{
              indicator: (
                <div>
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 30 }} spin />
                    }
                  />
                </div>
              ),
              spinning: loading,
            }}
            // }
          />


    </Modal>

    <Modal
        open={showDeleteFromGroupModal}
        onCancel={cancelDeleteFromGroupModal}
        title="Do you really wish to remove the user from this group"
        onOk={handleDeleteFromGroup}
        style={{marginTop:30}}
      />

    <AddGroupModal
          visible={addGroupModalVisible}
          onCancel={handleAddGroupModalCancel}
          addGroupToSystem={addGroupToSystem}
          />

      <UpdateModal
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        updateUser={() => handleUpdateUser(selectedRoleId)}
        roleOptions={roleOptions}
        setSelectedRoleId={setSelectedRoleId} // Pass the setSelectedRoleId prop
      />

      <DeleteConfirmationModal
        visible={deleteConfirmationVisible}
        onCancel={hideDeleteConfirmation}
        onConfirm={() => selectedUser && handleDelete(selectedUser)}
        userName={selectedUser ? selectedUser.user_name : ""}
      />

    </>
  );
};

export default ManageUsers;
