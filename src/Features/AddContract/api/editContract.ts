import axiosInstance from "../../../Config/AxiosConfig";
import { EditContractDetails } from "../types/editcontract";

export const editContract = async (
  contractData: EditContractDetails,
  CON_ID: number
) => {
  try {
    console.log(contractData);
    const response = await axiosInstance.post(
      `/api/contracts/edit/${CON_ID}`,
      contractData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error occured!!!',error);
    throw new Error("Something went wrong while editing the contract.");
  }
};
