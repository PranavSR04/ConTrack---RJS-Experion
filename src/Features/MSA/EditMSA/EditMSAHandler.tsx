import React, { useEffect, useState } from 'react'
import { MSADataInitial, MSADataType, MSAType } from '../MSA/types'
import { useLocation } from 'react-router';
import { getMsa } from './api/getMsa';
import dayjs from "dayjs";
import EditMSA from './EditMSA';


const EditMSAHandler = () => {
    const [msaEdited,setMsaEdited]=useState<boolean>(true)
    const [msaData,setMsaData]=useState<MSAType>();
    const [initialValues,setInitialValues]=useState<MSADataInitial>();
    const location = useLocation();
	let { id } = location.state;
	const msa_id = parseInt(id);
     
    //Function to get Msa Data
    const getMsaData=async()=>{
        const response = await getMsa(msa_id);
		 setMsaData(response.data.data[0]);
    }
    useEffect(()=>{
        getMsaData();
    },[])
    useEffect(()=>{
        const initaiValuesData = {
            msa_ref_id:msaData?.msa_ref_id,
            client_name:msaData?.client_name,
            region:msaData?.region,
            msa_doclink:msaData?.msa_doclink,
            comments:msaData?.comments,
            start_date: dayjs(msaData?.start_date),
            end_date: dayjs(msaData?.end_date)
        };
        setInitialValues(initaiValuesData)
    },[msaData])
  return (
    <>
    <EditMSA
    msa_id={msa_id}
    initialValues={initialValues}
    msaData={msaData}
    msaEdited={msaEdited}
    />

    </>
  )
}

export default EditMSAHandler
