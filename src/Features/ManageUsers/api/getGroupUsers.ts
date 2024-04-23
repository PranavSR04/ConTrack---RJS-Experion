import axiosInstance from "../../../Config/AxiosConfig";

export const getGroupUsers = async (
  page: number,
  pageSize: number,
  selectedIndividualGroup:number |undefined,
  searchQuery1?: string
) => {
  return await axiosInstance.get(`api/groups/list/users`, {
    params: {
      page: page,
      per_page: pageSize,
      group_id:selectedIndividualGroup,
      search: searchQuery1,
    },
  });
};
