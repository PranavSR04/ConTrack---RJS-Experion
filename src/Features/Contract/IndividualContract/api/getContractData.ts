import { AxiosError } from "axios";
import { ContractApiType } from "../types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const getContractData = async (id:string):Promise<ContractApiType| AxiosError> => {
  return await axiosInstance
    .get(`/api/contract/list/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};
