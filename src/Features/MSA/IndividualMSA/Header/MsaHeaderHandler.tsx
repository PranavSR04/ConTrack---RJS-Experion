import React, { useEffect, useState } from "react";
import { HeaderHandlerPropType, HeadingHandlerType } from "./types";
import { useNavigate } from "react-router";
import MsaHeader from "./MsaHeader";

const MsaHeaderHandler = ({ responses, id }: HeaderHandlerPropType) => {
  const [error, setError] = useState<string>("");
  const[loading,isLoading]=useState<boolean>(false);
  const [msaRefId, setMsaRefId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [msaExcelData, setMsaExcelData] = useState<(string | number)[][]>([]);
  const [msaStatus, setMsaStatus] = useState<number>(0);
  const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0", 10);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    console.log("response in Header Handler", responses);
    getMsaHeading(responses);
  }, [responses]);

  // Function which is used to set the data required from response
  const getMsaHeading: HeadingHandlerType["getMsaHeading"] = (responses) => {
    if (responses && responses.data && responses.data.length > 0) {
      isLoading(true);
      setMsaRefId(responses.data[0].msa_ref_id);
      setClientName(responses.data[0].client_name);
      setMsaStatus(responses.data[0].is_active);
      if ("data" in responses) {
        console.log("this is the data",responses.data[0]);

        const responseDataArray = [responses.data[0]];
        let dataWithHeaders = [];

        // dataArray contains data items from the response
        const dataArray = responseDataArray.map((item) => {
          console.log("the id is ",item.id)
          const row = [
            item.id,
            item.msa_ref_id,
            item.added_by,
            item.client_name,
            item.region,
            item.msa_doclink,
            item.start_date,
            item.end_date,
            item.comments,
            item.is_active,
            item.created_at,
            item.updated_at,
          ];
          if (item.contracts) {
            item.contracts.forEach((contracts: any) => {
              const contractRow = [...row]; // Create a copy of the original row
              contractRow.push(
                contracts.id,
                contracts.contract_ref_id,
                contracts.contract_status,
                contracts.contract_type,
                contracts.du,
                contracts.estimated_amount,
                contracts.start_date,
                contracts.end_date,
              );
              dataWithHeaders.push(contractRow); // Push the new row for the milestone
            });
          } else {
            // Push empty values for milestones if they don't exist
            row.push("", "", "", "", "", "", "", "");
            dataWithHeaders.push(row); // Push the original row with empty milestone values
          }
          return row;
        });

        // Prepend the column headers to the dataArray
        dataWithHeaders.unshift([
          "ID",
          "MSA REF ID",
          "Added By",
          "Client Name",
          "Region",
          "Start Date",
          "End Date",
          "Comments",
          "Is Active",
          "Created At",
          "Updated At",
          "Contracts ID",
          "Contract Ref ID",
          "Contract_status",
          "Contract_type",
          "DU",
          "Estimated Amount",
          "Contract Start Date",
          "Contract End Date"
        ]);
        setMsaExcelData(dataWithHeaders);
        console.log("excel data",msaExcelData)
      } else {
        console.error("Error fetching contract data:", responses);
      }
    } else {
      setError("Failed to get response");
    }
  };

  const navigateToEditMsa=(id: string)=>{
    navigate('/MSAOverview/EditMSA', { state: {id:id as string , msaEdited: true } });
  }
  const navigateToRenewMsa=(id: string)=>{
    navigate('/MSAOverview/RenewMSA', { state: {id:id as string , msaRenewed: true } });
   
  }
  return (
    <>
      <MsaHeader
        msaRefId={msaRefId}
        clientName={clientName}
        ROLE_ID={ROLE_ID}
        msaExcelData={msaExcelData}
        msaStatus={msaStatus}
        navigateToEditMsa={navigateToEditMsa}
        navigateToRenewMsa={navigateToRenewMsa}
        id={id}
        loading={loading}
      />
    </>
  );
};

export default MsaHeaderHandler;
