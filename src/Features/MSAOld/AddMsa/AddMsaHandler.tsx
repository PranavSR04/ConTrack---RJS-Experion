import React, { useContext, useEffect, useState } from "react";
import AddMsa from "./AddMsa";
import { Form, message } from "antd";
import moment, { Moment } from "moment";
import { getapi } from "./api/getapi";
import { postapi } from "./api/postapi";
import { useNavigate } from "react-router";
import { RcFile } from "antd/es/upload";

const AddMsaHandler = () => {
  const user_id: number = parseInt(localStorage.getItem("user_id") || "0");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [msaAdded, setMsaAdded] = useState<boolean>(false);
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const maxSize = 10 * 1024 * 1024;
  const [msaRefId, setMsaRefId] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [start_date, setstart_date] = useState<string>();
  const [date_validate, setDate_validated] = useState<boolean>(false);

  useEffect(() => {
    generateMsaId();
  }, []);

  // Function to generate a unique MSA ID
  const generateMsaId = async () => {
    try {
      let uniqueIdGenerated = false;
      let generatedId = "";
      while (!uniqueIdGenerated) {
        // Generate a random MSA ID
        generatedId = `MSA${Math.floor(Math.random() * 1000)}`;
         // Check if the generated ID exists in the database
        const exists = await getapi(generatedId);
        if (!exists) {
          uniqueIdGenerated = true;
        }
      }
      // Set the generated ID as the MSA reference ID in the component state
      setMsaRefId(generatedId);
      setFormData({ ...formData, msa_ref_id: generatedId });
    } catch (error) {
      console.error("Error generating MSA ID:", error);
    }
  };

  const [formData, setFormData] = useState({
    msa_ref_id: "",
    client_name: "",
    region: "",
    start_date: "",
    end_date: "",
    comments: "",
    file: null as File | null,
  });
  // Function to handle file upload before actual upload
  const beforeUpload = (file: RcFile) => {
    // Check if the file size exceeds the maximum allowed size
    if (file.size > maxSize) {
      // If the file size exceeds the maximum, show an error message
      message.error("File must be smaller than 10MB!");
      return false;
    }
    return true;
  };
  // Function to handle file upload
  const handleFileUpload = (info: any) => {
    try {
      // Update the form data with the uploaded file
      setFormData({ ...formData, file: info.file });
      setFileName(info.file.name);
    } catch (e) {
      console.log("file upload error is", e);
    }
  };
  // Function to handle input change events
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Destructure the 'name' and 'value' from the event target
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Function to handle start date change events
  const handleDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    if (typeof dateString === "string") {
      // Update the form data with the new start_date value
      setFormData({ ...formData, start_date: dateString });
      setstart_date(start_date);
    }
  };
  // Function to handle end date change events
  const handleEndDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    if (typeof dateString === "string") {
      // Update the form data with the new end_date value
      setFormData({ ...formData, end_date: dateString });
    }
  };
  // Function to handle the addition of MSA
  const handleAddMsa = () => {
    // Check if the form is filled correctly
    const formstatus = isFormFilled();
    // Handle different form statuses
    if (formstatus == "field") {
      window.alert(
        "Please fill all required fields before submitting the form."
      );
    } else if (formstatus == "date") {
      window.alert("End Date must be greater than Start Date.");
    } else {
      setIsModalVisible(true);
    }
  };
  // Function to handle the submission of the form data
  const handleOk = async () => {
    SubmitAddMsa();
  };
  // Function to submit the MSA data
  const SubmitAddMsa = async () => {
    console.log("Insie MSA");
    try {
      setSpinning(true);
      // Create a new FormData object and append form data
      console.log("Inside submit");
      const formDatatoSend = new FormData();
      formDatatoSend.append("msa_ref_id", formData.msa_ref_id);
      formDatatoSend.append("client_name", formData.client_name);
      formDatatoSend.append("region", formData.region);

      formDatatoSend.append("start_date", formData.start_date);
      formDatatoSend.append("end_date", formData.end_date);

      formDatatoSend.append("comments", formData.comments);
      formDatatoSend.append("file", formData.file || "");
      // Post form data to the API
      await postapi(formDatatoSend, user_id);
      // setSpinning(false);
      console.log("After submit");
      // setMsaAdded(true);
      // setIsModalVisible(false);
      // form.resetFields();
      // generateMsaId();
      // navigate("/MSA Overview", { state: { added: true } });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }finally{
      setSpinning(false);
      setMsaAdded(true);
      setIsModalVisible(false);
      form.resetFields();
      generateMsaId();
      navigate("/MSAOverview", { state: { added: true } });

    }
  };
  // Function to validate start date against end date
  const validateStartDate = async (value: any) => {
    if (
      value &&
      formData.end_date &&
      moment(value).isAfter(formData.end_date)
    ) {
      throw new Error("End date must be after start date");
    }
  };
  // Function to handle cancellation of form submission
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Function to check if all required fields are filled
  const isFormFilled = () => {
    console.log("test", fileName);
    console.log("test clent name", formData.client_name);
    if (
      formData.client_name == "" ||
      formData.region == "" ||
      formData.start_date == "" ||
      formData.end_date == "" ||
      fileName == null
    ) {
      return "field";
    } else if (formData.end_date <= formData.start_date) {
      if (formData.end_date <= formData.start_date) {
        setDate_validated(true);
      } else {
        setDate_validated(false);
      }
      return "date";
    } else {
      return false;
    }
  };
  return (
    <div>
      <AddMsa
        msaRefId={msaRefId}
        handleFileUpload={handleFileUpload}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleEndDateChange={handleEndDateChange}
        handleAddMsa={handleAddMsa}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        fileName={fileName}
        msaAdded={msaAdded}
        validateStartDate={validateStartDate}
        handleOk={handleOk}
        start_date={start_date}
        date_validate={date_validate}
        spinning={spinning}
        beforeUpload={beforeUpload}
      />
    </div>
  );
};

export default AddMsaHandler;
