import { useState } from 'react'
import { useLocation } from 'react-router';
import EditMSA from './EditMSA';


const EditMSAHandler = () => {
    const [msaEdited,setMsaEdited]=useState<boolean>(true)
    const location = useLocation();
	let { id } = location.state;
	const msa_id =id;
     
   
  return (
    <>
    <EditMSA
    msa_id={msa_id}
    msaEdited={msaEdited}
    />

    </>
  )
}

export default EditMSAHandler
