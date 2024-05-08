import React, { useEffect, useState } from 'react'
import MSAForm from './MSAForm'
import {  MSADataInitial, MSADataType, MsaFormHandlerPropType } from './types'
import moment from 'moment';
import { useNavigate } from 'react-router';
import { IsMsaExists } from './api/IsMsaExists';
import dayjs from "dayjs";
import { EditMsa } from './api/EditMsa';
import { Form } from 'antd';

const MSAFormHandler = ({
  addMsa,
  initialValues,
  msaData,
  msa_id,
  msaAdded,
  msaEdited
}:MsaFormHandlerPropType) => {
  const user_id: number = parseInt(localStorage.getItem("user_id") || "0");
  const [fileName,setFileName]=useState<string|undefined>('');
  const [initialFields,setInitialFields] = useState<[MSADataType]>();
   const navigate=useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const handleCancel = () => {setIsModalOpen(false);};
	const showModal = () => {setIsModalOpen(true);};
	const [modalTitle,setModalTitle] = useState<string>("");
  const [spinning, setSpinning] = useState<boolean>(false);
  const[showFile,setShowFile]=useState<boolean>(false);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
const[msa_ref_id,setmsa_ref_id]=useState<string>();

useEffect(()=>{
  console.log("initial Values are ",msaData)
  if(msaEdited){
    setModalTitle("Do you want to Edit this MSA ?");
   setShowFile(true)
   setmsa_ref_id(msaData?.msa_ref_id);
    
  }
  
},[msaData])
  // Function to generate a unique MSA ID
const handleMsaRefId = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if(msaAdded){
  try {
    let uniqueIdGenerated = false;
    let generatedId = "";
    const clientName = event.target.value.toUpperCase().replace(/\s/g, ""); 
    const prefix = clientName.length > 10 ? clientName.substring(0, 4) : clientName.substring(0, 3); 
    while (!uniqueIdGenerated) {
      generatedId = `${prefix}${Math.floor(Math.random() * 1000)}`;
      const exists = await IsMsaExists(generatedId);
      if (!exists) {
        uniqueIdGenerated = true;
      }
      initialValues={ msa_ref_id:generatedId };
      setInitialFields([{name: "msa_ref_id", value: generatedId}])
       const formFields=[{name: "msa_ref_id", value: generatedId}]
      setModalTitle(`Do you want add msa with MSA Reference Id: ${generatedId}`)
    }
  
  } catch (error) {
    console.error("Error generating MSA ID:", error);
  }
}
};
  //Formate the day.js object to yyyy-mm-dd formate
	const getFormatedDate = (date: any) => {
		const dateObject = new Date(date ? date.$d : "2024-11-2");
		const formattedDate = moment(dateObject).format("YYYY-MM-DD");
		return formattedDate;
	};

   // Function to handle changes in form fields
   const handleFormChange = (changedValues:any, allValues:any) => {
    console.log('Changed form values:', changedValues); // Log changed values
    setFormValues(allValues); // Update form values in state
  };

   // Function to handle file upload
   const handleFileUpload = (info: any) => {
    const filename=info.file.originFileObj;
    console.log(info.file.name,"is the filename")
    setFileName(info.file.name);
    setShowFile(true);
    return filename;
  };
 
      //Function to cancel file 
      const fileCancel = () => {
        setShowFile(false)
      };


  //Function to Submmit the msa form
  const onFinish=async(values:any)=>{
    setSpinning(true)
   
    console.log(msaData,"is the formatted msa Data")
    if(msaAdded){
      const {start_date,end_date,file,...rest}=values
      const msaData={
        ...rest,
        start_date:getFormatedDate(start_date),
        end_date:getFormatedDate(end_date),
        file:file ? handleFileUpload(file) : fileName
      }
    try {
      addMsa && await addMsa(msaData);
      setSpinning(false)
    } catch (error) {
      console.log("Error in adding MSA", error);
    }finally{
      navigate("/MSAOverview", {
        state: { added: true},
        });
    }
  }
  if(msaEdited){
    const {start_date,end_date,file,...rest}=values
    const msaData={
      ...rest,
      start_date:getFormatedDate(start_date),
      end_date:getFormatedDate(end_date),
      file:file ? handleFileUpload(file) : fileName
    }
    msaData.msa_ref_id=msa_ref_id;
    try{
      await EditMsa(msaData,user_id)
      setSpinning(false)
    } catch (error) {
      console.log("Error in adding MSA", error);
    }finally{
      navigate("/MSAOverview", {
        state: { edited: true},
        });
    }
  }
  }

  return (
    <MSAForm
    onFinish={onFinish}
    handleCancel={handleCancel}
		showModal={showModal}
    isModalOpen={isModalOpen}
    modalTitle={modalTitle}
    handleMsaRefId={handleMsaRefId}
    initialValues={initialValues}
    initialFields={initialFields}
    handleFileUpload={handleFileUpload}
    fileName={fileName}
    spinning={spinning}
    fileCancel={fileCancel}
    msaData={msaData}
    msaAdded={msaAdded}
    msaEdited={msaEdited}
    showFile={showFile}
    handleFormChange={handleFormChange}
    />
  )
}

export default MSAFormHandler
