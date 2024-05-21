import React from "react";
import { Scatter } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
// import { DataItem, Props } from './types';
import { useEffect, useState } from "react";
import axios from "axios";
import { ContractRevenue } from "./types";
import axiosInstance from "../../Config/AxiosConfig";
// import {  LinearScale, DeepPartial } from 'chart.js';
// import { ScatterDataPoint} from "chart.js"
import "chart.js/auto";
import { getContractRevenue } from "./api/getContractRevenue";
import { ScatterPlotHandlerPropType } from "./types";

const ScatterPlot = ({
	fetchContractRevenue,
	scatterData,
	data,
}: ScatterPlotHandlerPropType) => {
	return (
		<div >
			<p style={{ fontSize: ".7rem", textAlign: "center" }}>Contract Revenue</p>
			<Scatter
				data={data}
				options={{
					scales: {
						x: {
							beginAtZero: true,
							title: {
								display: true,
								text: "Contract Term (in months)",
							},
						},

						y: {
							beginAtZero: true,
							title: {
								display: true,
								text: "Revenue (USD)",
							},
							ticks: {
								callback: function (value: any) {
                                    if (value >= 0) {
                                        return (value / 1000000).toFixed(2) + 'M';
                                    } else {
                                        return value.toFixed(2);
                                    }
                                },
							},
						},
					},
					plugins: {
						legend: {
							display: false, // Hide the legend
						},
						tooltip: {
							enabled: false, // Disable tooltip hover
						},
					},
				}}
			/>
		</div>
	);
};

export default ScatterPlot;
