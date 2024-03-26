import { AxiosResponse } from "axios";
import { Condition } from "../types";
import axiosInstance from "../../../Config/AxiosConfig";

export const fetchMyContractsApi = async (
  searchConditions: Condition,
  currentPage: number,
  pageSize: number,
  userId: string,
  checkedExpiring:boolean,
  slideroption:string
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
      `http://127.0.0.1:8000/api/contracts/myContracts/${userId}?${queryStrings}&page=${currentPage}&per_page=${pageSize}${checkedExpiring && '&status=Expired'}${slideroption && `&${slideroption}=true`}`
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
