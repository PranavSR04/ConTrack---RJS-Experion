import React, { useEffect, useState } from "react";
import { Milestone, ContractDetails, RcFile, AssociatedMember } from "./types";
import "./api/api";
import dayjs from "dayjs";
import { getMSA } from "./api/getMSA";
import { addContract } from "./api/api";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { useNavigate } from "react-router-dom";
import AddContract from "./AddContract";
import { getUser } from "./api/getUser";
import { Moment } from "moment";

const AddContractHandler = () => {
  const [contractDetails, setContractDetails] = useState<ContractDetails>({
    msa_id: "",
    clientName: "",
    contract_ref_id: "",
    region: "",
    du: "",
    start_date: "",
    end_date: "",
    date_of_signature: "",
    contract_type: "TM",
    milestone: [
      {
        milestones: "",
        expectedCompletionDate: "",
        percentage: null,
        amount: null,
      },
    ],
    assoc_users: [],
    file: null as RcFile | null,
    comments: "",
    estimated_amount: 0,
    contract_added_by: parseInt(localStorage.getItem("user_id") || "0"),
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [contractAdded, setContractAdded] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<Milestone[]>(
    contractDetails.milestone
  );
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number[]>([]);
  const [clientNameOptions, setClientNameOptions] = useState<
    { value: string }[]
  >([]);
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const [userNameOptions, setUserNameOptions] = useState<AssociatedMember[]>(
    []
  );
  const [contractType, setContractType] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any>();
  const [newMilestoneAmount, setNewMilestoneAmount] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  let updatedAssocMembers: any = [];

  const navigate = useNavigate();

  // Function to fetch client names
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

  // Function to fetch user names
  const getUserName = async () => {
    try {
      const response = await getUser();
      console.log("API RESPONSE onSearch:", response);

      if (Array.isArray(response.data.data)) {
        console.log("RESPONSE>DATA.DATA", response.data.data);

        const userList: AssociatedMember[] = response.data.data.map(
          (data: { user_name: string; id: number }) => ({
            label: data.user_name,
            value: data.id,
          })
        );
        console.log("userLIST AFTER MAP", userList);
        setUserNameOptions(userList);
        console.log("SETTED USERNAME OPTIONS", userNameOptions);
      } else {
        console.error("Invalid data format for user names. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  };

  // Function to handle changes in the start date of the contract
  const handleStartDateChange = (value: Moment | null) => {
    const startDateString = value ? value.format("YYYY-MM-DD") : "";
    setContractDetails({
      ...contractDetails,
      start_date: startDateString,
    });
  };

  // Function to handle changes in the end date of the contracts
  const handleEndDateChange = (value: Moment | null) => {
    const endDateString = value ? value.format("YYYY-MM-DD") : "";
    setContractDetails({
      ...contractDetails,
      end_date: endDateString,
    });
  };

  // Function to handle changes in the date of signature of the contract
  const handleDateOfSignatureChange = (value: Moment | null) => {
    const dateOfSignatureString = value ? value.format("YYYY-MM-DD") : "";
    setContractDetails({
      ...contractDetails,
      date_of_signature: dateOfSignatureString,
    });
  };

  // Validation function for end date
  const validateEndDate = (rule: any, value: Moment | null) => {
    if (
      value &&
      contractDetails.start_date &&
      value.isBefore(contractDetails.start_date)
    ) {
      return Promise.reject("End Date must be after Start Date");
    }
    return Promise.resolve();
  };

  // Validation function for date of signature
  const validateDateOfSignature = (rule: any, value: Moment | null) => {
    if (
      value &&
      contractDetails.start_date &&
      contractDetails.end_date &&
      (value.isAfter(contractDetails.start_date) ||
        value.isAfter(contractDetails.end_date))
    ) {
      return Promise.reject("Must be before Start Date & End Date");
    }
    return Promise.resolve();
  };

  // Validation function for checking if percentage is greater than 100
  const checkPercentage = (_: any, value: number) => {
    if (value > 100) {
      return Promise.reject(new Error("% > 100"));
    }
    return Promise.resolve();
  };

  // Validation function for checking sum of percentages for milestones
  const checkSumOfPercentage = (index: number, value: any) => {
    let total = value;
    milestones.forEach((milestone, i) => {
      if (i !== index) {
        total += milestone.percentage || 0;
      }
    });

    if (total !== 100) {
      return Promise.reject(new Error("% error"));
    }
    return Promise.resolve();
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
    setMilestones([
      ...milestones,
      {
        milestones: "",
        expectedCompletionDate: "",
        percentage: null,
        amount: null,
      },
    ]);
  };

  // Function to remove a milestone
  const removeMilestone = (index: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  // Function to set amount for all milestones
  const handleAmount = (paymentamount: number | null) => {
    const updatedMilestones = milestones.map((milestone) => {
      return {
        ...milestone,
        percentage: null,
        amount: paymentamount,
      };
    });
    setMilestones(updatedMilestones);
    const updatedContractDetails = {
      ...contractDetails,
      milestone: updatedMilestones,
    };
    setContractDetails(updatedContractDetails);
  };

  // Function to handle payment percentage change for a milestone
  const handlePaymentPercentageChange = (
    index: number,
    value: number | undefined
  ) => {
    if (value !== undefined && contractDetails.estimated_amount !== null) {
      const paymentAmount =
        (value / 100) * (contractDetails.estimated_amount ?? 0);
      const updatedMilestones = milestones.map((milestone, idx) => {
        if (idx === index) {
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
        milestone: updatedMilestones,
      };
      setAmount(paymentAmount);
      setContractDetails(updatedContractDetails);
      console.log("new check milestone amount", amount);
      console.log("updatedContractDetails", updatedContractDetails);
    }
  };

  // Update new milestone amount when amount changes
  useEffect(() => {
    console.log("new check milestone amount", newMilestoneAmount);
    setNewMilestoneAmount(amount);
  }, [amount]);

  // Function to handle total contract value change
  const handleTotalContractValueChange = (value: number | null) => {
    if (value !== undefined && value !== null) {
      setContractDetails({
        ...contractDetails,
        estimated_amount: value,
        milestone: milestones.map((milestone) => ({
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
    let value = e.target.value;
    if (value.length > 200) {
      value = value.slice(0, 200);
    }
    setContractDetails({
      ...contractDetails,
      comments: value,
    });
  };

  // Function to handle file upload
  const handleFileUpload = (info: UploadRequestOption<any>) => {
    try {
      console.log("File uploaded successfully:", info.file as RcFile);
      console.log({ ...contractDetails, workSchedule: info.file as RcFile });
      setContractDetails({
        ...contractDetails,
        file: info.file as RcFile,
      });
      setFileList(info.file);
    } catch (e) {
      console.log("file upload error", e);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      setSpinning(true);
      await addContract(contractDetails);

      setContractAdded(true);
      console.log("Navigating from");
      navigate("/AllContracts", {
        state: { added: contractAdded as boolean },
      });
    } catch (error) {
      console.log("Form not submitted");
    }
  };

  // Function to handle milestone change
  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string | dayjs.Dayjs | number | null
  ) => {
    let convertedValue: Date | null = null;
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
    const updatedContractDetails = {
      ...contractDetails,
      milestone: updatedMilestones,
    };
    setContractDetails(updatedContractDetails);
  };

  // Hook to fetch MSA and user data on component mount
  useEffect(() => {
    let responses;
    const fetchMSA = async () => {
      try {
        responses = await getMSA();
        console.log("MSA response", responses.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMSA();
    getUserName();
  }, []);
  useEffect(() => {
    let responses;
    const fetchUser = async () => {
      try {
        responses = await getUser();
        console.log("User response", responses.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
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
          clientName: clientData.client_name,
          region: clientData.region,
        });
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  // Function to select a user
  const selectUser = (data: AssociatedMember) => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        console.log("Key:", key);
        console.log("Value:", value);
        if (
          !contractDetails.assoc_users.some((user) => user.user_id === value)
        ) {
          const updatedAssoc = [
            ...contractDetails.assoc_users,
            { user_id: value },
          ];
          updatedAssocMembers = [...updatedAssocMembers, ...updatedAssoc];
        } else {
          console.log("Skipping duplicate value:", value);
        }
      });
      console.log("UpdatedAssoc", updatedAssocMembers);
      setContractDetails({
        ...contractDetails,
        assoc_users: updatedAssocMembers,
      });
    }
  };

  return (
    <AddContract
      contractAdded={contractAdded}
      contractType={contractType}
      selectClient={selectClient}
      handleMilestoneChange={handleMilestoneChange}
      handleSubmit={handleSubmit}
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
      getUserName={getUserName}
      selectUser={selectUser}
      userNameOptions={userNameOptions}
      contractDetails={contractDetails}
      setContractDetails={setContractDetails}
      milestones={milestones}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      handleDateOfSignatureChange={handleDateOfSignatureChange}
      validateEndDate={validateEndDate}
      validateDateOfSignature={validateDateOfSignature}
      checkPercentage={checkPercentage}
      checkSumOfPercentage={checkSumOfPercentage}
      spinning={spinning}
    />
  );
};

export default AddContractHandler;
