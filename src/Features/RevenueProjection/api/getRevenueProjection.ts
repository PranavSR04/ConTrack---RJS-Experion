import axiosInstance from "../../../Config/AxiosConfig";


export const fetchRevenueProjection = async (id?:number, msa_id?:number, requestBody?: any) =>{
    let url = 'api/revenue/list/';
    console.log(requestBody);
    if (id !== undefined) {
        url += id;
    }
    if (msa_id !== undefined) {
        url += '?msa_id='+msa_id;
    }

    const config = { 
        params: requestBody
    };
    
    return await axiosInstance
        .get(url,config)
        .then((res) => res.data)
        .catch((err) => err);
}