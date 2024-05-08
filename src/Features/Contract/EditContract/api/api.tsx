import axiosInstance from "../../../../Config/AxiosConfig";
import { ContractType } from "../../ContractForm/types";

export const editContract = async (
	contractData: ContractType,
	contract_id: number
) => {
	try {
		console.log(contractData);
		const response = await axiosInstance.post(
			`/api/contracts/edit/${contract_id}`,
			contractData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		console.log(response);
		return response.data;
	} catch (error) {
		console.log("Error occured!!!", error);
		throw new Error("Something went wrong while editing the contract.");
	}
};

export const getContract = async (contract_id: number) => {
	try {
		const responce = await axiosInstance.get(`api/contract/list/${contract_id}`);
		return responce;
	} catch (error) {
		console.error("Error checking contract existence:", error);
		throw error;
	}
};
