import React, { useEffect, useState } from 'react'
import MSAForm from './MSAForm'
import { getmsainfo } from './api/getmsainfo';
import { RcFile } from 'antd/es/upload';
import { message } from 'antd';
import { postaddmsaform} from './api/postaddmsaform';
import { LocationStateProps } from './types';
import { getmsaapi } from './api/getmsaapi';
import { useLocation, useNavigate } from 'react-router';
import moment, { Moment } from "moment";
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
  const [spinning, setSpinning] = useState<boolean>(false);
  let [headingText,setHeadingText]=useState<string>("");
  const[msaState,setMsaState]=useState<string>("");
  const[msarefid,setMsarefid]=useState<boolean>();
  const[hideMsarefid,setHideMsarefid]=useState<boolean>();
  const[startDate,setStartDate]=useState<string>();

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
        setMsaState("update")
        setHideMsarefid(false)
        setShowFile(true)

     }
     // Check if renew MSA
     else if (state.msaRenewed){
       setMsaRenewed(true)
       setHeadingText("RENEW")
       setMsaState('renew')
       setHideMsarefid(false)
       setShowFile(false)

     }
    }

}, [msaEdited,msaRenewed,msaAdded,msaData.client_name]);

useEffect(() =>{
  handleAutoFillData();
  console.log("is this edit function");
},[msaEdited,msaRenewed])
//Function to autofill msa data for edit and renew msa
const handleAutoFillData=()=>{
  autoFillMsa(id);
}


// Function to generate a unique MSA ID
const generateMsaId = async () => {
  if(msaAdded){
  try {
    let uniqueIdGenerated = false;
    let generatedId = "";
    const clientName = msaData.client_name.toUpperCase().replace(/\s/g, ""); 
    const prefix = clientName.length > 10 ? clientName.substring(0, 4) : clientName.substring(0, 3); 
    while (!uniqueIdGenerated) {
      generatedId = `${prefix}${Math.floor(Math.random() * 1000)}`;
      const exists = await getmsainfo(generatedId);
      if (!exists) {
        uniqueIdGenerated = true;
      }
    }
    setMsaData(prevState => ({
      ...prevState,
      msa_ref_id: generatedId
    }));
  } catch (error) {
    console.error("Error generating MSA ID:", error);
  }
}
};

const autoFillMsa = async (id: string) => {
  try {
    // Fetch MSA data from API using msa_ref_id
    const data = await getmsaapi(id);
    const msa_data = data.data.data[0];
    if (msa_data) {
      const {msa_ref_id,client_name, region, start_date, end_date, msa_doclink } =
        msa_data;
        if(msaEdited){
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
    if(msaRenewed){
      setMsaData((prevState) => ({
        ...prevState,
        msa_ref_id:msa_ref_id,
        client_name: client_name,
        region: region,
        msa_doclink: msa_doclink, 
      }))
    }
    }
  } catch (error) {
    console.error("Error generating MSA ID:", error);
  }

};

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setMsaData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

//Function to check the size of file
const beforeUpload = (file: RcFile) => {
  if (file.size > maxSize) {
    message.error("File must be smaller than 10MB!");
    return false;
  }
  return true;
};

// Function to handle file upload
const handleFileUpload = (info: any) => {
  try {
    setFileUpload( info.file );
    setFileName(info.file.name);
    setShowFile(true);
  } catch (e) {
    console.log("file upload error is", e);
  }
};

  // Function to handle start date change events
  const handleStartDateChange = (date: Moment | null, dateString: string | string[]) => {
    if (date) {
      const startDateFormatted = date.format('YYYY-MM-DD');
      setMsaData({ ...msaData, start_date: startDateFormatted });
      setStartDate(startDateFormatted);
      console.log(startDateFormatted)
    }
  };
  
  // Function to handle end date change events
  const handleEndDateChange = (date: Moment | null, dateString: string | string[]) => {
    if (date) {
      const endDateFormatted = date.format('YYYY-MM-DD');
      setMsaData({ ...msaData, end_date: endDateFormatted });
    }
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
  setSpinning(true);
  const msaFormData = new FormData();
msaFormData.append('msa_ref_id', msaData.msa_ref_id); 
msaFormData.append('client_name', msaData.client_name);
msaFormData.append('region', msaData.region);
  msaFormData.append('start_date', msaData.start_date);
  msaFormData.append('end_date', msaData.end_date);
msaFormData.append('comments', msaData.comments);
msaFormData.append('file',fileUpload||'')
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
      msaEdited={msaEdited}
      startDate={startDate}
      />
    </div>
  )
}

export default MSAFormHandler
