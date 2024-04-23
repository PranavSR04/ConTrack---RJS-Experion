import axiosInstance from "../../../../../Config/AxiosConfig";

export const fetchRevenueProjection = async (id?:number,requestBody?: any) =>{
    let url = 'api/revenue/list/';
    console.log(requestBody);
    if (id !== undefined) {
        url += id;
    }
    const config = { 
        params: requestBody
    };
    
    return await axiosInstance
        .get(url,config)
        .then((res) => res.data)
        .catch((err) => err);
}