import axios from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const getTopRevenueRegion = async () => {
  return await axiosInstance.get(`/api/contracts/topRevenueRegions`);
};
