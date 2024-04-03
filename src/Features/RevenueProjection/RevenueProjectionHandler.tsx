import React, { useState } from "react";
import RevenueProjection from "./RevenueProjection";
import { CheckboxOptionType, CheckboxValueType } from "antd/es/checkbox/Group";
import { Checkbox } from "antd";
import { RevenueProjectionHandlerPropType, SelectedFiltersType } from "./types";

const RevenueProjectionHandler = ({ id }: RevenueProjectionHandlerPropType) => {

	const [filter, setFilter] = useState<string>("Monthly");
	const access_token = localStorage.getItem("access_token");
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>(
		{}
	);
  const[filterStartDate,setFilterStartDate]=useState<string>();
  const[filterEndDate,setFilterEndDate]=useState<string>();
	const duOptions = ["DU1", "DU2", "DU3", "DU4"];
	const regionOptions = ["USA", "Canada", "Japan"];

  const onhandledatechange = (dates: any, dateStrings: any) => {
    console.log('Selected Dates:', dates);
    console.log('Formatted Date Strings:', dateStrings);
    setFilterStartDate(dateStrings[0]);
    setFilterEndDate(dateStrings[1]);

}

	const showFilterModal = () => {
		setIsFilterModalOpen(true);
	};

	const handleOk = () => {
		setIsFilterModalOpen(false);
	};

	const handleCancel = () => {
		setIsFilterModalOpen(false);
	};

	const getFilteredValue = (value: string) => {
		console.log(value);
		setFilter(value);
	};

	const onChange = (filterType: string, checkedValues: CheckboxValueType[]) => {
		setSelectedFilters({
			...selectedFilters,
			[filterType]: checkedValues,
		});
		console.log(selectedFilters);
	};

	const renderCheckboxGroup = (
		filterType: string,
		options:
			| (string | number | CheckboxOptionType<CheckboxValueType>)[]
			| undefined
	) => {
		let disabled = false;
		if (filterType === "region") {
			disabled = true;
		}
		return (
			<Checkbox.Group
				options={options}
				onChange={(checkedValues) => onChange(filterType, checkedValues)}
				disabled={disabled}
			/>
		);
	};

	const applyFilters = () => {
		console.log("Selected filters:", selectedFilters);
	};



	return (
		<>
			<RevenueProjection
				getFilteredValue={getFilteredValue}
				filter={filter}
				showFilterModal={showFilterModal}
				isFilterModalOpen={isFilterModalOpen}
				handleCancel={handleCancel}
				handleOk={handleOk}
				applyFilters={applyFilters}
				renderCheckboxGroup={renderCheckboxGroup}
				onChange={onChange}
				regionOptions={regionOptions}
				duOptions={duOptions}
				selectedFilters={selectedFilters}
				id={id}
        onhandledatechange={onhandledatechange}
        filterEndDate={filterEndDate}
        filterStartDate={filterStartDate}
			/>
		</>
	);
};

export default RevenueProjectionHandler;
