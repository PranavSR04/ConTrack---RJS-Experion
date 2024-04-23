import axiosInstance from "../../../../Config/AxiosConfig";

export const getmsaapi = async (id: string) => {
  
    return axiosInstance.get(`api/msa/page/${id}`)
    .then(response => {
      const responseData = response.data.data[0];
      return responseData; // Return the data object if needed
    })
    .catch(error => {
      console.error("Error checking MSA ID existence:", error);
      throw error; // Throw the error to handle it in the calling code
    });
  }

