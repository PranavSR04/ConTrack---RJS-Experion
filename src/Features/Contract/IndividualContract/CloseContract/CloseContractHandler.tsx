import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { postCloseContract } from "../api/postCloseContract";
import { CloseContractHandlerPropType, CloseContractHandlerType} from "./types";
import CloseContract from "./CloseContract";

const CloseContractHandler = ({
  responses,
  id,
}: CloseContractHandlerPropType) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [contractStatus, setContractStatus] = useState<string>("");
  const [contractClosed, setContractClosed] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    console.log("response in Header Handler", responses);
    getContractStatus(responses);
  }, [responses]);

  // Function which is used to set the data required from response
  const getContractStatus: CloseContractHandlerType["getContractStatus"] = (
    responses
  ) => {
    if (responses && responses.data && responses.data.length > 0) {
      setContractStatus(responses.data[0].contract_status);
    }
  };

  // Function which triggers on cancel or close button of modal
  const onCancel = () => {
    setVisible(false);
  };

  // Function to trigger modal pop up
  const modalPopUp = () => {
    setVisible(true);
  };

  // Function to change contract_status to Closed
  const closeContract = async () => {
    try {
      await postCloseContract(id);
      setContractClosed(true)
      console.log("Closed contract with id:", id);
    } catch (error) {
      // Handle any other unexpected errors here
      console.error("Error in closing contract:", error);
    } finally {
      // Close the modal
      onCancel();
      navigate("/AllContracts",  {state: { closed: contractClosed }});
    }
  };
  return (
    <div>
      <CloseContract
        visible={visible}
        onCancel={onCancel}
        closeContract={closeContract}
        modalPopUp={modalPopUp}
        contractStatus={contractStatus}
      />
    </div>
  );
};

export default CloseContractHandler;
