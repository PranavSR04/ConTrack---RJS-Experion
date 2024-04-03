import { AxiosError } from "axios";
import axiosInstance from "../../../../Config/AxiosConfig";

export const postCloseContract = async (
  id: string
): Promise<void | AxiosError> => {
  return await axiosInstance
    .post(`/api/contracts/edit/${id}`, {
      contract_status: "Closed",
    })
    .then((res) => res.data)
    .catch((err) => err);
};
