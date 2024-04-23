import { AxiosError } from "axios";
import { MsaApiType } from "../types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const getMSAData = async (id:string):Promise<MsaApiType| AxiosError> => {
  return await axiosInstance
    .get(`/api/msa/page/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};
