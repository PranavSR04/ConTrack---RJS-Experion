import axiosInstance from "../../../../Config/AxiosConfig";
import { ContractType } from "../types";

export const getMSA = async (searchvalue?: string) => {
	return await axiosInstance
		.get(`/api/msa/list? ${searchvalue ? `client_name=${searchvalue}` : ""}`)
		.then((res: any) => res.data)
		.catch((err: any) => err);
};

export const getUserList = async (searchvalue?: string) => {
  return await axiosInstance
    .get(`/api/users/get${searchvalue ? `?user_id=${searchvalue}` : ""}`)
    .then((res: { data: any }) => res.data)
    .catch((err: any) => err);
};

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