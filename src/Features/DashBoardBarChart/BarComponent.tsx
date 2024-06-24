import React from "react";
import { BarChartPropType } from "./types";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BarComponent = ({ data, maxDataValue }: BarChartPropType) => {
	return (
		<div style={{paddingTop:"-10px", width: "100%", scale: "102%", height:"230px"}}>
			<Bar 
				data={data}
				options={{
					responsive: true,
					maintainAspectRatio: false, // Set to false to manage aspect ratio dynamically
					plugins: {
						legend: {
						  labels: {
							font: {
							  size: 12  // Font size
							},
							boxWidth: 15  // Color block width
						  }
						}
					  },
					scales: {
						x: {
							title: {
								display: true,
								text: "Contract Count",
							},
						},
						y: {
							grid: {
								display: false,
							},
							title: {
								display: false,
								text: "Contract Count",
							},
							// min: 0,
							// max: Math.ceil(maxDataValue * 1.1),
						},
					},
				}}
			/>
		</div>
	);
};

export default BarComponent;

