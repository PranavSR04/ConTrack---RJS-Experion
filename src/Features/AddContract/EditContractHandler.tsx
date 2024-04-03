import React, { useEffect, useState } from "react";
import { RcFile, LocationStateProps, ExistingMilestone } from "./types";
import "./api/api";
import dayjs from "dayjs";
import { getMSA } from "./api/getMSA";
import { useLocation, useNavigate } from "react-router-dom";
import EditContract from "./EditContract";
import { editContract } from "./api/editContract";
import { getapi } from "./api/getContract";
import { EditContractDetails } from "./types/editcontract";

const EditContractHandler = () => {
  const location = useLocation();
  let { id } = location.state as LocationStateProps;
  const CON_ID = parseInt(id);
  const [contractDetails, setContractDetails] = useState<EditContractDetails>({
    msa_id: "",
    client_name: "",
    contract_ref_id: "",
    region: "",
    du: "",
    start_date: "",
    end_date: "",
    date_of_signature: "",
    contract_type: "TM",
    milestones: [
      {
        milestone_desc: "",
        milestone_enddate: null,
        percentage: null,
        amount: null,
      },
    ],
    associatedMembers: [],
    file: null as RcFile | null,
    comments: "",
    estimated_amount: null,
    contract_added_by: 3,
  });
  const [existingMilestone, setExistingMilestone] = useState<
    ExistingMilestone[]
  >([]);
  const [contractEdited, setContractEdited] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<ExistingMilestone[]>(
    contractDetails.milestones || []
  );
  const [contractType, setContractType] = useState<string | null>(null);
  const [clientNameOptions, setClientNameOptions] = useState<
    { value: string }[]
  >([]);

  const [contractPdf, setContractPdf] = useState<RcFile | null>();
  const navigate = useNavigate();
  const [spinning, setSpinning] = React.useState<boolean>(false);

  // Effect to auto-fill contract details when `id` changes
  useEffect(() => {
    if (id) {
      autoFillContract(id);
    }
  }, [id]);

  // Function to auto-fill contract details based on ID
  const autoFillContract = async (id: string) => {
    try {
      const data = await getapi(id);
      const contractData = data?.data;
      console.log("getContract api:", contractData);
      if (contractData) {
        setContractDetails(contractData.data[0]);
        setExistingMilestone(contractData.data[0].milestones);
      }
    } catch (error) {
      console.error("error in filling");
    }
  };

  // Function to fetch client names based on search value
  const getClientName = async (searchValue: string) => {
    try {
      const response = await getMSA(searchValue);
      const result = response.data;

      const clientNames = result.map((item: any) => item.client_name);
      const uniqueOptions: { value: string }[] = Array.from(
        new Set(clientNames)
      ).map((name) => ({ value: name as string }));
      setClientNameOptions(uniqueOptions);
    } catch (error) {
      console.error("Error fetching client names:", error);
    }
  };

  // Function to handle contract type change
  const handleContractTypeChange = (value: "FF" | "TM") => {
    setContractDetails({
      ...contractDetails,
      contract_type: value,
    });
    setContractType(value);
  };

  // Function to add a new milestone
  const handleAddMilestone = () => {
    console.log(existingMilestone);
    const newMilestone = {
      milestone_desc: "",
      milestone_enddate: null,
      percentage: null,
      amount: null,
    };
    console.log(newMilestone);
    setExistingMilestone([...existingMilestone, newMilestone]);
  };

  // Function to remove a milestone
  const removeMilestone = (index: number) => {
    const updatedMilestones = [...existingMilestone];
    updatedMilestones.splice(index, 1);
    setExistingMilestone(updatedMilestones);
  };

  // Function to handle amount change
  const handleAmount = (paymentamount: number | null) => {
    const updatedMilestones = milestones.map((milestone) => {
      return {
        ...milestone,
        percentage: null,
        amount: paymentamount,
      };
    });
    setMilestones(updatedMilestones);

    // Also update the contractDetails if needed
    const updatedContractDetails = {
      ...contractDetails,
      milestone: updatedMilestones,
    };
    setContractDetails(updatedContractDetails);
  };

  // Function to handle payment percentage change
  const handlePaymentPercentageChange = (
    index: number,
    value: number | undefined
  ) => {
    console.log("Entered payment");
    console.log("Received index:", index);
    console.log("Received value:", value);

    if (value !== undefined && contractDetails.estimated_amount !== null) {
      const updatedMilestones = milestones.map((milestone, idx) => {
        if (idx === index) {
          const paymentAmount =
            (value / 100) * (contractDetails.estimated_amount ?? 0);
          console.log("paymentAmount", paymentAmount);
          console.log("milestone", milestone);

          return {
            ...milestone,
            percentage: value,
            amount: paymentAmount,
          };
        } else return milestone;
      });

      setMilestones(updatedMilestones);
      console.log("updatedMilestones", updatedMilestones);

      const updatedContractDetails = {
        ...contractDetails,
        milestones: updatedMilestones,
      };
      setContractDetails(updatedContractDetails);
    }
  };

  // Function to handle total contract value change
  const handleTotalContractValueChange = (value: number | null) => {
    if (value !== undefined && value !== null) {
      setContractDetails({
        ...contractDetails,
        estimated_amount: value,
        milestones: milestones.map((milestone) => ({
          ...milestone,
          amount: ((milestone.percentage ?? 0) / 100) * value,
        })),
      });
    }
  };

  // Function to handle comments/remarks change
  const handleCommentsRemarksChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setContractDetails({
      ...contractDetails,
      comments: value,
    });
  };

  // Function to handle file upload
  const handleFileUpload = (info: any) => {
    setContractDetails({
      ...contractDetails,
      file: info.file as RcFile,
    });
    console.log({ ...contractDetails, workSchedule: info.file as RcFile });
    try {
      console.log("File uploaded successfully:", info.file as RcFile);
      setContractPdf(info.file);
      console.log("setContract file:", contractDetails.file);
    } catch (e) {
      console.log("file upload error is", e);
    }
  };

  // Function to handle contract update
  const handleUpdate = async () => {
    console.log("Data to updtae", contractDetails);
    try {
      console.log("Updating Contract:", contractDetails.milestones);
      console.log("existingMilestone Contract:", existingMilestone);

      const updatedContractDetails: EditContractDetails = {
        ...contractDetails,
        milestones: contractDetails.milestones,
      };

      console.log("Updated Contract Details:", updatedContractDetails);
      setSpinning(true);
      await editContract(updatedContractDetails, CON_ID);
      console.log("Contract Updated Successfully!");
      setContractEdited(true);
      //   navigate("/AllContracts");
      navigate("/AllContracts", {
        state: { edited: contractEdited as boolean },
      });
    } catch (error: any) {
      console.error("Error editing contract:", error.message);
      // Optionally, you can set an error state or show a notification to the user
    }
  };

  // Function to handle milestone change
  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string | dayjs.Dayjs | number | null
  ) => {
    console.log("index", index);
    console.log("filed", field);
    console.log("value", value);

    let convertedValue: Date | null = null;
    // Convert dayjs object to Date
    if (dayjs.isDayjs(value)) {
      convertedValue = (value as dayjs.Dayjs).toDate();
    }
    console.log("conv value", convertedValue);
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: dayjs.isDayjs(value) ? convertedValue : value,
    };
    setMilestones(updatedMilestones);

    // Update contractDetails as well if needed
    const updatedContractDetails = {
      ...contractDetails,
      milestones: updatedMilestones,
    };
    console.log(updatedContractDetails);
    setContractDetails(updatedContractDetails);
  };
  console.log("setContractDetails. milestone", contractDetails.milestones);

  // Effect to fetch MSA data on component mount
  useEffect(() => {
    let responses;
    const fetchMSA = async () => {
      try {
        responses = await getMSA();
      } catch (err) {
        console.log(err);
      }
    };
    fetchMSA();
  }, []);

  // Function to select a client
  const selectClient = async (value: string) => {
    try {
      const response = await getMSA(value);
      const clientData = response.data[0];
      console.log("Client data", clientData);
      if (clientData) {
        setContractDetails({
          ...contractDetails,
          msa_id: clientData.id,
          client_name: clientData.client_name,
          region: clientData.region,
        });
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  return (
    <EditContract
      contractEdited={contractEdited}
      contractType={contractType}
      selectClient={selectClient}
      handleMilestoneChange={handleMilestoneChange}
      handleUpdate={handleUpdate}
      handleFileUpload={handleFileUpload}
      handleCommentsRemarksChange={handleCommentsRemarksChange}
      handleTotalContractValueChange={handleTotalContractValueChange}
      handlePaymentPercentageChange={handlePaymentPercentageChange}
      handleAmount={handleAmount}
      removeMilestone={removeMilestone}
      handleAddMilestone={handleAddMilestone}
      handleContractTypeChange={handleContractTypeChange}
      getClientName={getClientName}
      clientNameOptions={clientNameOptions}
      contractDetails={contractDetails}
      setContractDetails={setContractDetails}
      milestones={milestones}
      existingMilestone={existingMilestone}
      spinning={spinning}
    />
  );
};

export default EditContractHandler;
