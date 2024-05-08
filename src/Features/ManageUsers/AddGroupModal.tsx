import React, { useState } from 'react';
import { Modal, Button, Select, Input } from 'antd';
import userTableStyles from './ManageUsers.module.css'
 
interface AddGroupModalProps {
    visible: boolean;
    onCancel: () => void;
    addGroupToSystem: (groupName: string) => void;
  }
 
const AddGroupModal = ({visible,onCancel,addGroupToSystem}:AddGroupModalProps)=>{ 
    const [group_name, setGroupName] = useState('');
    return (
        <Modal
          title={"Add New Group"}
          className={userTableStyles.updateModal}
          open={visible}
          onCancel={onCancel}
          footer={[
            <Button key="cancel" onClick={onCancel}>
                        Cancel
            </Button>,
            <Button 
            key="ok" 
            type="primary" 
            className={userTableStyles.customButtonYes}
            onClick={() => addGroupToSystem(group_name)}
            >
                    Add
            </Button>,
                    ]}
            >
            <Input 
                        placeholder='Enter group name'
                        value={group_name}
                        onChange={e => setGroupName(e.target.value)}
                        />
        </Modal>
      );
    };
    export default AddGroupModal;