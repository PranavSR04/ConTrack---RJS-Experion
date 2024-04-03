import axios from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const getContractRevenue = async () => {
  return await axiosInstance.get(`/api/contracts/revenue`);
};
