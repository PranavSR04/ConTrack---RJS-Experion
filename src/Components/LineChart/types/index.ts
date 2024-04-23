import { RevenueProjectionData, SelectedFiltersType } from "../../../Features/RevenueProjection/types";

export interface LineChartPropType {
	revenueData: RevenueProjectionData[] | undefined;
	loading: boolean;
	error: { error?: string } | undefined;
}
export interface LineChartHandlerPtopType {
	filter: string;
	selectedFilters: SelectedFiltersType;
	id:number |undefined;
	msa_id:number |undefined;
	filterEndDate:string|undefined;
	filterStartDate:string|undefined;
	
}