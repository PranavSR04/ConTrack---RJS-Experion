import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import { fetchRevenueProjection } from "./api/getRevenueProjection";
import { RevenueProjectionData } from "./types";
import styles from "./RevenueProjection.module.css";

const DemoLine = () => {
	const [data, setData] = useState<RevenueProjectionData[]>([]);

	useEffect(() => {
		fetRevenue();
		console.log(data);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetRevenue = async () => {
		const data = await fetchRevenueProjection();
		// setData(data.data);
		console.log(data.data);
		const convertedData: RevenueProjectionData[] = Object.entries(
			data.data
		).map(([key, value]) => ({
			Date: key,
			Revenue: Number(value),
		}));

		console.log(convertedData);
		convertedData && setData(convertedData);
	};

	const config = {
		data,
		padding: "auto",
		xField: "Date",
		yField: "Revenue",
    facet:false,
    axis:{
      type:'axisY',
      tickCount:10
    },
    scale:{
      type:'linear',
      tickCount:10,
    },
    slider:'x',
    // scale: {y: {ticksCount:10 }},
		// scale: {tickCount: 5 },
		// slider: {
		//   start: '2012-12',
		//   end: '2013-12',
		// },
		// marginRight:500
	};

	return (
		<div className={styles.body}>
			<div className={styles.large_column}>
				<div className={styles.container}>
					<Line {...config} scales= {10}/>
				</div>
			</div>
		</div>
	);
};

export default DemoLine;
