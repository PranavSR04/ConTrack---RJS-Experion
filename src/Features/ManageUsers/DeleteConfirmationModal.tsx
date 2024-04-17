import React from "react";
import { Modal, Button } from "antd";
import userTableStyles from "./ManageUsers.module.css";

interface DeleteConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName: string;
}

const DeleteConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  userName,
}: DeleteConfirmationModalProps) => {
  const title = "Do you really wish to remove";

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      className={userTableStyles.customDeleteConfirmation}
      footer={[
        <Button
          key="cancel"
          className={userTableStyles.customButton}
          onClick={onCancel}
        >
          No
        </Button>,
        <Button
          key="confirm"
          type="primary"
          className={userTableStyles.customButtonYes}
          onClick={onConfirm}
        >
          Yes
        </Button>,
      ]}
    >
      <div className={userTableStyles.customFooter}>
        <strong>{userName}</strong>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
