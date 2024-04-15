import { AxiosResponse } from "axios";
import { Condition } from "../types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const fetchMyContractsApi = async (
  searchConditions: Condition,
  currentPage: number,
  pageSize: number,
  userId: string,
  checkedExpiring:boolean,
  slideroption:string,
  sortField?:string,
  sortOrder?:string
) => {
  try {
    let queryString: string[] = [];

    for (let condition in searchConditions) {
      let query = `${condition}=${searchConditions[condition]}`;
      queryString.push(query);
    }
    let queryStrings = queryString.join("&"); //join the search queries

    console.log("search query", queryStrings);
    const response: AxiosResponse = await axiosInstance.get(
      `/api/contracts/myContracts/${userId}?${queryStrings}&page=${currentPage}&per_page=${pageSize} ${checkedExpiring ? '&status=Expired':''} ${sortField ? `&sort_by=${sortField}&sort_value=${sortOrder}` : ''}${slideroption && `&${slideroption}=true`}`
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
