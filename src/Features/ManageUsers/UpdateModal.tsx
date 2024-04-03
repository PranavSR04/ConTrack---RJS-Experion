import React from 'react';
import { Modal, Button, Select } from 'antd';
import userTableStyles from './ManageUsers.module.css'
import { RoleOption,User } from './types';


interface UpdateModalProps {
    visible: boolean;
    onCancel: () => void;
    updateUser: () => void;
    
    // onOk: (roleId: number | undefined) => void;
    roleOptions: RoleOption[];

     setSelectedRoleId: React.Dispatch<React.SetStateAction<number | undefined>>; 
  }

  const UpdateModal = ({visible,onCancel,updateUser,setSelectedRoleId,roleOptions}:UpdateModalProps)=>{
  
    return (
        <Modal
          title={"Change Role "}
          className={userTableStyles.updateModal}
          open={visible}
          onCancel={onCancel}
          footer={[
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>,
          <Button key="ok" type="primary" onClick={updateUser} className={userTableStyles.customButtonYes}>
           Save
          </Button>,
          ]}
        >
          <Select
            className={`${userTableStyles.viewUpdateUserAccessBox}`}
            // options={roleOptions}
            // style={{ width: 200 }}
            options={roleOptions}
            onSelect={(value) => setSelectedRoleId(value as number)}
            placeholder='Select a role'
          />
          {/* Add other input fields or content as needed */}
        </Modal>
      );
    };
    
    export default UpdateModal;