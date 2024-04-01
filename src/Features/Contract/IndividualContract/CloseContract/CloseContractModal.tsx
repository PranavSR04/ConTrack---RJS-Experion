import { Button, Modal } from "antd";
import React from "react";
import { CloseContractModalPropType, CloseContractPropType } from "./types";

const CloseContractModal = ({
  visible,
  onCancel,
  closeContract,
}: CloseContractModalPropType) => {
  return (
    <>
      <Modal
        title={"Do you wish to close this contract"}
        open={visible}
        onCancel={onCancel}
        footer={[
          <Button key="ok" type="primary" onClick={closeContract}>Yes</Button>,
          <Button key="cancel" onClick={onCancel}>No</Button>
        ]}
      ></Modal>
    </>
  );
};

export default CloseContractModal;
