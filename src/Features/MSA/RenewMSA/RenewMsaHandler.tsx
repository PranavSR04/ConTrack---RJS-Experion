import { useState } from 'react'
import { useLocation } from 'react-router';
import RenewMSA from './RenewMsa';


const RenewMSAHandler = () => {
    const [msaRenewed,setMsaRenewed]=useState<boolean>(true)
    const location = useLocation();
	let { id } = location.state;
	const msa_id =id;
     
   
  return (
    <>
    <RenewMSA
    msa_id={msa_id}
    msaRenewed={msaRenewed}
    />

    </>
  )
}

export default RenewMSAHandler
