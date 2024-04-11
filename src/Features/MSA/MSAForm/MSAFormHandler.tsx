import React, { useEffect, useState } from 'react'
import MSAForm from './MSAForm'
import { getmsainfo } from './api/getmsainfo';
import { RcFile } from 'antd/es/upload';
import { message } from 'antd';
import { postaddmsaform} from './api/postaddmsaform';
import { LocationStateProps } from './types';
import { getmsaapi } from './api/getmsaapi';
import { useLocation, useNavigate } from 'react-router';
import dayjs from 'dayjs';
import moment from 'moment';
import { posteditmsaform } from './api/posteditmsaform';
import { postrenewmsaform } from './api/postrenewmsaform';
const MSAFormHandler = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const user_id: number = parseInt(localStorage.getItem("user_id") || "0");
  let { id } = location.state as LocationStateProps;
  const[msaAdded,setMsaAdded]=useState<boolean>();
  const[msaEdited,setMsaEdited]=useState<boolean>();
  const[msaRenewed,setMsaRenewed]=useState<boolean>();
  const maxSize = 10 * 1024 * 1024;
  const [fileName, setFileName] = useState<string>();
  const[fileUpload,setFileUpload]=useState<any>();
  const[showFile,setShowFile]=useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [spinning, setSpinning] = React.useState<boolean>(false);
  let [headingText,setHeadingText]=useState<string>("");
  const[msaState,setMsaState]=useState<string>("");
  const[msarefid,setMsarefid]=useState<boolean>();
  const[hideMsarefid,setHideMsarefid]=useState<boolean>();

  const [msaData,setMsaData]=useState({
    msa_ref_id: '',
    client_name: "",
    region: "",
    start_date: "",
    end_date: "",
    comments: "",
    file: null as RcFile | null,
  })

  useEffect(() => {
    //Check the location to handle function in form
      if (location .state) {
        const state = location.state as LocationStateProps;
        // Check if add MSA
        if (state.msaAdded) {
            setMsaAdded(true);
            setHeadingText("ADD");
            setMsaState("add")
            setHideMsarefid(true);
        }
         //Check if edit MSA
      else if (state.msaEdited) {
        setMsaEdited(true);
        setHeadingText("EDIT")
        handleAutoFillData()
        setMsaState("update")
        setHideMsarefid(false)
        setShowFile(true)

     }
     // Check if renew MSA
     else if (state.msaRenewed){
       setMsaRenewed(true)
       setHeadingText("RENEW")
       handleAutoFillData()
       setMsaState('renew')
       setHideMsarefid(false)
       setShowFile(false)

     }
    }

}, [msaEdited,msaRenewed,msaAdded,msaData.client_name]);

//Function to autofill msa data for edit and renew msa
const handleAutoFillData=()=>{
  autoFillMsa(id);
}


// Function to generate a unique MSA ID
const generateMsaId = async () => {
  try {
    let uniqueIdGenerated = false;
    let generatedId = "";
    const clientName = msaData.client_name.toUpperCase().replace(/\s/g, ""); // Convert client name to uppercase and remove spaces
    const prefix = clientName.length > 10 ? clientName.substring(0, 4) : clientName.substring(0, 3); // Determine prefix based on client name length

    while (!uniqueIdGenerated) {
      // Generate a random MSA ID
      generatedId = `${prefix}${Math.floor(Math.random() * 1000)}`;
       // Check if the generated ID exists in the database
      const exists = await getmsainfo(generatedId);
      if (!exists) {
        uniqueIdGenerated = true;
      }
    }
    // Set the generated ID as the MSA reference ID in the component state
    setMsaData(prevState => ({
      ...prevState,
      msa_ref_id: generatedId
    }));
  } catch (error) {
    console.error("Error generating MSA ID:", error);
  }
};

const autoFillMsa = async (id: string) => {
  try {
    // Fetch MSA data from API using msa_ref_id
    const data = await getmsaapi(id);
    const msa_data = data.data.data[0];
    //console.log(msa_data)
    if (msa_data) {
      const {msa_ref_id,client_name, region, start_date, end_date, msa_doclink } =
        msa_data;
      setMsaData((prevState) => ({
        ...prevState,
        msa_ref_id:msa_ref_id,
        client_name: client_name,
        region: region,
        start_date:start_date,
        end_date:end_date,
        msa_doclink: msa_doclink, 
      }))
    }
  } catch (error) {
    console.error("Error generating MSA ID:", error);
  }
};

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  // Destructure the 'name' and 'value' from the event target
  const { name, value } = e.target;
  setMsaData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

//Function to check the size of file
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
    setFileUpload( info.file );
    setFileName(info.file.name);
    setShowFile(true);
  } catch (e) {
    console.log("file upload error is", e);
  }
};

const handleStartDateChange = (
  dateString: string 
) => {
  let formattedDateString: string;
  const parsedDate = dayjs(dateString);
    formattedDateString = parsedDate.format('YYYY-MM-DD');
  // Update the state with the formatted date string
  setMsaData({ ...msaData,start_date: formattedDateString });
};
const handleEndDateChange = (
  dateString: string
) => {
  let formattedDateString: string;
  const parsedDate = dayjs(dateString);
    formattedDateString = parsedDate.format('YYYY-MM-DD')
  // Update the state with the formatted date string
  setMsaData({ ...msaData,end_date: formattedDateString });
};

//Function to handle visibility of modal
const handleSubmit = () => {
  generateMsaId();
    setIsModalVisible(true);
};

  // Function to handle cancellation of modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

    //Function to cancel file 
    const fileCancel = () => {
      setShowFile(false)
    };
  //Function to handle form submission
const handleSubmitForm=async(value:any)=>{
  console.log(msaData)
  //New FormData is created to store values from form
  const msaFormData = new FormData();

msaFormData.append('msa_ref_id', msaData.msa_ref_id); 
msaFormData.append('client_name', msaData.client_name);
msaFormData.append('region', msaData.region);
  msaFormData.append('start_date', msaData.start_date);
  msaFormData.append('end_date', msaData.end_date);
msaFormData.append('comments', msaData.comments);
msaFormData.append('file',fileUpload||'')
//Api to post the data for add msa
if(msaAdded){
  await postaddmsaform(msaFormData,user_id);
  setSpinning(false);
  navigate("/MSAOverview", { state: { added: true } });
}
else if(msaEdited){
  await posteditmsaform(msaFormData,user_id);
  setSpinning(false);
  navigate("/MSAOverview", { state: { edited: true } });
}
else{
  await postrenewmsaform(msaFormData,user_id);
  setSpinning(false);
  navigate("/MSAOverview", { state: { renew: true } });
}
}

//Function to validate start date
const validateStartDate = async (value:any) => {
  if (value && msaData.end_date && moment(value).isAfter(msaData.end_date)) {
    throw new Error('End date must be after start date');
  }
};

  return (
    <div>
      <MSAForm
      msaData={msaData}
      fileName={fileName}
      handleFileUpload={handleFileUpload}
      beforeUpload={beforeUpload}
      handleSubmit={handleSubmit}
      isModalVisible={isModalVisible}
      handleSubmitForm={handleSubmitForm}
      handleCancel={handleCancel}
      spinning={spinning}
      headingText={headingText}
      handleInputChange={handleInputChange}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      validateStartDate={validateStartDate}
      showFile={showFile}
      fileCancel={fileCancel}
      msaAdded={msaAdded}
      hideMsarefid={hideMsarefid}
      msaRenewed={msaRenewed}
      />
    </div>
  )
}

export default MSAFormHandler
