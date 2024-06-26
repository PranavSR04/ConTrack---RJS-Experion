import { ContractType } from "../../../../Components/ContractForm/types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const postContract = async (contractData: ContractType) => {
    try {
      console.log("From api fromtend", contractData);
  
      const response = await axiosInstance.post(
        `/api/contracts/add`,
        contractData,
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
      throw new Error("Something went wrong while adding the contract.");
    }
  };