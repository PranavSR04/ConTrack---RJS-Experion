import axios from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const getapi = async (id: string) => {
  try {
    const data = await axiosInstance.get(`api/contract/list/${id}`);
    return data;
  } catch (error) {
    console.error("Error checking contract existence:", error);
    throw error;
  }
};
