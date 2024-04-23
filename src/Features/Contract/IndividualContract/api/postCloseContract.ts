import { AxiosError } from "axios";
import axiosInstance from "../../../../Config/AxiosConfig";

export const postCloseContract = async (
  id: string
): Promise<void | AxiosError> => {
  const contractClosedBy = parseInt(localStorage.getItem("user_id") || "0");
  return await axiosInstance
    .post(`/api/contracts/edit/${id}`, {
      contract_status: "Closed",
      contract_added_by: contractClosedBy
    })
    .then((res) => res.data)
    .catch((err) => err);
};
