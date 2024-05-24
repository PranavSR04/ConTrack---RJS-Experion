import React, { useEffect, useState } from "react";
import { HeaderHandlerPropType, HeadingHandlerType } from "./types";
import Header from "./Header";
import { useNavigate } from "react-router";

const HeaderHandler = ({ responses, id }: HeaderHandlerPropType) => {
  const [error, setError] = useState<string>("");
  const [contractRefId, setContractRefId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [contractExcelData, setContractExcelData] = useState<
    (string | number)[][]
  >([]);
  const [contractType, setContractType] = useState<string>("");
  const [contractStatus, setContractStatus] = useState<string>("");
  const [du, setDU] = useState<string>("");
  const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0", 10);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("response in Header Handler", responses);
    getContractHeading(responses);
  }, [responses]);

  // Function which is used to set the data required from response
  const getContractHeading: HeadingHandlerType["getContractHeading"] = (
    responses
  ) => {
    if (responses && responses.data && responses.data.length > 0) {
      setContractRefId(responses.data[0].contract_ref_id);
      setClientName(responses.data[0].client_name);
      setDU(responses.data[0].du);
      setContractStatus(responses.data[0].contract_status);
      setContractType(responses.data[0].contract_type);
      if ("data" in responses) {
        console.log(responses.data[0]);

        const responseDataArray = [responses.data[0]];
        let dataWithHeaders = [];

        // dataArray contains data items from the response
        const dataArray = responseDataArray.map((item) => {
          const row = [
            item.id,
            item.msa_ref_id,
            item.client_name,
            item.user_name,
            item.contract_ref_id,
            item.contract_type,
            item.date_of_signature,
            item.comments,
            item.start_date,
            item.end_date,
            item.du,
            item.contract_doclink,
            item.estimated_amount,
            item.contract_status,
            
            
          ];

          // Check if milestones exist
          if (item.milestones) {
            item.milestones.forEach((milestone: any) => {
              const milestoneRow = [...row]; // Create a copy of the original row
              milestoneRow.push(
                milestone.milestone_desc,
                milestone.milestone_enddate,
                milestone.percentage,
                milestone.amount
              );
              dataWithHeaders.push(milestoneRow); // Push the new row for the milestone
            });
          } else {
            // Push empty values for milestones if they don't exist
            row.push("", "", "", "", "", "");
            dataWithHeaders.push(row); // Push the original row with empty milestone values
          }

          return row;
        });

        // Prepend the column headers to the dataArray
        dataWithHeaders.unshift([
          "ID",
          "MSA REF ID",
          "Client Name",
          "Added By",
          "Contract REF ID",
          "Contract Type",
          "Signature Date",
          "Comments",
          "Start Date",
          "End Date",
          "DU",
          "Document Link",
          "Estimated Amount",
          "Status",
          "Milestone Description",
          "Milestone End Date",
          "Milestone Percentage",
          "Milestone Amount",
        ]);

        console.log(dataWithHeaders);

        // Setting the data to be passed to Header component for exporting into excel
        setContractExcelData(dataWithHeaders);
      } else {
        console.error("Error fetching contract data:", responses);
      }
    } else {
      setError("Failed to get response");
    }
  };

  // Function whcih triggers the navigation on click of edit button
  const navigateToEditContract = (id: string) => {
    navigate(`/AllContracts/Edit Contract`, {
      state: { id: id as string },
    });
  }

  return (
    <>
      <Header
        contractRefId={contractRefId}
        clientName={clientName}
        ROLE_ID={ROLE_ID}
        contractExcelData={contractExcelData}
        contractType={contractType}
        du={du}
        contractStatus={contractStatus}
        navigateToEditContract={navigateToEditContract}
        id={id}
      />
    </>
  );
};

export default HeaderHandler;
