import { useState } from "react";
import AddMSA from "./AddMSA";

const AddMSAHandler = () => {
  const [msaAdded,setmsaAdded]=useState<Boolean>(true)

  return (
    <>
      <AddMSA
       msaAdded={msaAdded}/>
    </>
  )
}

export default AddMSAHandler
