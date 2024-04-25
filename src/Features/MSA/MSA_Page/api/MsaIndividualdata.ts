import axiosInstance from "../../../../Config/AxiosConfig";

export const MsaIndividualdata=async(id:number)=>{
    try {
        const data = await axiosInstance.get(
            `api/msa/page/${id}`
          );
          return data;
        } catch (error) {
          console.error("Error checking MSA ID ", error);
          throw error;
        }
    };