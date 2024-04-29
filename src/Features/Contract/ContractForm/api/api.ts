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

