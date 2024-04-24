import React, { useEffect, useState } from "react";
import { HeaderHandlerPropType, HeadingHandlerType } from "./types";
import { useNavigate } from "react-router";
import MsaHeader from "./MsaHeader";

const MsaHeaderHandler = ({ responses, id }: HeaderHandlerPropType) => {
  const [error, setError] = useState<string>("");
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
      setMsaRefId(responses.data[0].msa_ref_id);
      setClientName(responses.data[0].client_name);
      setMsaStatus(responses.data[0].is_active);
      if ("data" in responses) {
        console.log(responses.data[0]);

        const responseDataArray = [responses.data[0]];
        let dataWithHeaders = [];

        // dataArray contains data items from the response
        const dataArray = responseDataArray.map((item) => {
          const row = [
            item.id,
            item.msa_ref_id,
            item.added_by,
            item.client_name,
            item.region,
            item.start_date,
            item.end_date,
            item.comments,
            item.is_active,
            item.msa_doclink,
            item.created_at,
            item.updated_at,
            item.user_name,
            item.contracts,
            item.msa_olddoclink,
          ];

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
          "Msa Document Link",
          "Created At",
          "Updated At",
          "User Name",
          "Contracts",
          "Msa Old Document Links",
        ]);

        console.log(dataWithHeaders);

        // Setting the data to be passed to Header component for exporting into excel
        setMsaExcelData(dataWithHeaders);
      } else {
        console.error("Error fetching contract data:", responses);
      }
    } else {
      setError("Failed to get response");
    }
  };

  // // Function to trigger navigation to the edit MSA page
  // const navigateToEditMsa = (id: string) => {
  //   navigate(`Edit MSA`, {
  //       state: { id: id as string },
  //   });
  // };

  // // Function to trigger navigation to the renew MSA page
  // const navigateToRenewMsa = (id: string) => {
  //   navigate(`/MSAOverview/Renew MSA`, {
  //       state: { id: id as string },
  //   });
  // };
  
  const navigateToEditMsa = (id: string) => {
    navigate(`/MSAForm/${msaRefId}`, { state: {id:id as string } });
    console.log("hi",id, msaRefId)
   
  };
  const navigateToRenewMsa=(id:string)=>{
    navigate(`/MSAForm/${msaRefId}`, { state: {id:id as string } });
   
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
      />
    </>
  );
};

export default MsaHeaderHandler;
