import { CheckboxOptionType } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";

export type RevenueProjectionPropType = {
	getFilteredValue: (value: string) => void;
	filter: string;
	showFilterModal: () => void;
	isFilterModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	applyFilters: () => void;
	renderCheckboxGroup: (
		filterType: string,
		options:
			| (string | number | CheckboxOptionType<CheckboxValueType>)[]
			| undefined
	) => JSX.Element;
	onChange: (filterType: string, checkedValues: CheckboxValueType[]) => void;
	regionOptions: string[];
	duOptions: string[];
	selectedFilters: {};
	id?:number |undefined;
	msa_id?:string |undefined;
	onhandledatechange:(dates: any, dateStrings: any) => void;
	filterEndDate:string|undefined;
	filterStartDate:string|undefined;	
};
export type RevenueProjectionHandlerPropType = {
	id?:number;
};

export interface RevenueProjectionData {
	Date: string;
	Revenue:number;
}

export interface SelectedFiltersType {
	contractType?: string[];
	du?: string[];
	region?: string[];
	cType?: string[];
}
