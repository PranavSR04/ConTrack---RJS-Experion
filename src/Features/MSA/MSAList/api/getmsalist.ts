import { AxiosResponse } from "axios";
import axiosInstance from "../../../../Config/AxiosConfig";
import { Condition } from "../types";

export const getmsalist = async (
  currentPage: number,
  pageSize: number,
  searchConditions: Condition
) => {
  try {
    let queryString: string[] = [];
     // Check if 'is_active' is '0'
     const isActiveZero = searchConditions['is_active'] === '0';

     // If 'is_active' is '0' and currentPage is not 1, set currentPage to 1
     if (isActiveZero && currentPage !== 1) {
       currentPage = 1;
     }
    for (let condition in searchConditions) {
      let query = `${condition}=${searchConditions[condition]}`;
      queryString.push(query);
      
    }
    let queryStrings = queryString.join("&");
    console.log(queryString);
    console.log("search query", queryStrings);
   
    const response: AxiosResponse = await axiosInstance.get(
      `/api/msa/list?${queryStrings}&page=${currentPage}&per_page=${pageSize}`
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

