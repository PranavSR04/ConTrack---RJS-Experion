import { useState } from "react";
import AddMSA from "./AddMSA";
import { postMsa } from "./api/postMsa";
import { MSAType } from "./types";


const AddMSAHandler = () => {
  const [msaAdded,setmsaAdded]=useState<Boolean>(true)
  const user_id: number = parseInt(localStorage.getItem("user_id") || "0");
  const initialValues={};
  const addMsa = async (msaData: MSAType) => {
		try {
      console.log(msaData ,"is the data for posting into backend api")
			await postMsa(msaData,user_id);
		} catch (error) {
			console.log("Error - Adding Contract ", error);
		}
	};
  return (
    <>
      <AddMSA
       addMsa={addMsa}
       initialValues={initialValues}
       msaAdded={msaAdded}/>
    </>
  )
}

export default AddMSAHandler
