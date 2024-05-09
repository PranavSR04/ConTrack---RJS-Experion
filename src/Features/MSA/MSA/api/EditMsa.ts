import axiosInstance from "../../../../Config/AxiosConfig";
import { MSADataType } from "../types";

export const EditMsa = async (msaData:MSADataType, user_id: number) => {
  await axiosInstance.post(`api/msa/update/${user_id}`, msaData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(response => {
    // Handle successful response
    console.log("Response:", response.data);
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });
  ;
};
