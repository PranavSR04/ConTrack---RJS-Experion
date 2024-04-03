import React from "react";
import { LineChartHandlerPtopType, RevenueProjectionData } from "./types";
import { fetchRevenueProjection } from "./api/getRevenueProjection";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { AxiosError } from "axios";

const formatDate = (dateString:RevenueProjectionData[]) => {
    // Define an array to map full month names to abbreviated ones
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    // Iterate through each object in the array
    const formattedDates = dateString.map(obj => {
        // Split the full month name and year
        const [month, year] = obj.Date.split(', ');

        // Find the index of the month in the array of full month names
        const monthIndex = months.findIndex(m => m === month);

        // If the month index is found, construct the abbreviated date format
        if (monthIndex !== -1) {
            const abbreviatedMonth = months[monthIndex].slice(0, 3); // Get the first three characters of the month
            return {
                Date: `${abbreviatedMonth}, ${year}`,
                Revenue: obj.Revenue
            };
        } else {
            // If the month is not found, return the original object
            return obj;
        }
    });

    return formattedDates;
};


const LineChartHandler = ({
	filter,
	selectedFilters,
	id,
	filterEndDate,
	filterStartDate
}: LineChartHandlerPtopType) => {
	const [revenueData, setRevenueData] = useState<
		RevenueProjectionData[] | undefined
	>([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetRevenue();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter, selectedFilters,filterStartDate,filterEndDate]);
	console.log(selectedFilters);
	const fetRevenue = async () => {
		const requestBody = {
			type: filter.toLowerCase(),
			du: selectedFilters.du,
			ctype: selectedFilters.cType,
			startdate:filterStartDate,
			enddate:filterEndDate
		};
		setLoading(true);
		try {
			console.log("inside fun");
			const data = await fetchRevenueProjection(
				id ? id : undefined,
				requestBody
			);
			if (data instanceof AxiosError) {
				console.log(data.response?.data);
				setRevenueData(undefined);
				setError(data.response?.data);
			} else {
				const convertedData: RevenueProjectionData[] = Object.entries(
					data.data
				).map(([key, value]) => ({
					Date: formatDate([{
						Date: key,
						Revenue: Number(value)
					}])[0].Date, // Apply formatDate function and extract Date property
					Revenue: Number(value)
				}));
				console.log("Converted Data",convertedData);
				setRevenueData(convertedData);
			}
		} catch (error) {
			console.error("Error fetching revenue:", error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<LineChart revenueData={revenueData} loading={loading} error={error} />
	);
};

export default LineChartHandler;
