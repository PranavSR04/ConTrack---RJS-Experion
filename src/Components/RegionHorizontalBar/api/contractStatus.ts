import { AxiosResponse } from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const fetchDataFromApi = async (
) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/contract/topRegions`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    const result = response.data;
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], total: 0 };
  }
};
