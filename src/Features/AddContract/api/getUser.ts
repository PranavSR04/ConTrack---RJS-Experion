import axiosInstance from "../../../Config/AxiosConfig";

export const getUser = async (searchvalue?: string) => {
  return await axiosInstance
    .get(`/api/users/get${searchvalue ? `?user_id=${searchvalue}` : ""}`)
    .then((res: { data: any }) => res.data)
    .catch((err: any) => err);
};
