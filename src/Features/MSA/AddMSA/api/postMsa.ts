import axiosInstance from "../../../../Config/AxiosConfig";
import { MsaDataType } from "../../MSAForm/types";

export const postMsa = async (msaData: MsaDataType,user_id:number) => {
    try {
      console.log("From api fromtend", msaData);
  
      const response = await axiosInstance.post(
        `/api/msa/add/${user_id}`,
        msaData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
  
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error("Something went wrong while adding the msa.");
    }
  };