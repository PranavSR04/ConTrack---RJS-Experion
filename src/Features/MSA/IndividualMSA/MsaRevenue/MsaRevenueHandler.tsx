import { CheckboxOptionType, CheckboxValueType } from "antd/es/checkbox/Group";
import { Checkbox } from "antd";
import { RevenueProjectionHandlerPropType, SelectedFiltersType } from "./types";
import { useState } from 'react';
import RevenueProjection from '../../../RevenueProjection/RevenueProjection';
import styles from './RevenueProjection.module.css';

const MsaRevenueHandler = ({ msa_id }: RevenueProjectionHandlerPropType) => {
  const [filter, setFilter] = useState<string>("Monthly");
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>(
		{}
	);
  const[filterStartDate,setFilterStartDate]=useState<string>();
  const[filterEndDate,setFilterEndDate]=useState<string>();
	const duOptions = ["DU1", "DU2", "DU3", "DU4"];  //Filter Options
	const regionOptions = ["USA", "Canada", "Japan"];

  const onhandledatechange = (dates: any, dateStrings: any) => {  //Setting the filtered date to String 
    console.log('Selected Dates:', dates);
    console.log('Formatted Date Strings:', dateStrings);
    setFilterStartDate(dateStrings[0]);
    setFilterEndDate(dateStrings[1]);

}
	const showFilterModal = () => {  //Setting the modal true
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

	const renderCheckboxGroup = (   //Common filter type
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
    <div className={styles['maincontainer__chart']}>
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
				msa_id={msa_id}
        onhandledatechange={onhandledatechange}
        filterEndDate={filterEndDate}
        filterStartDate={filterStartDate}
			
      />
    </div>
  )
}

export default MsaRevenueHandler
