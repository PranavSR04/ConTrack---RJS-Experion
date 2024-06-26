import { DougnutChartPropsType, apiData } from "./types";
import { Doughnut } from "react-chartjs-2";
import { Card } from "antd";

const DoughnutChart = ({
	loading,
	chartData,
	options,
}: DougnutChartPropsType) => {
	return (
		<>
			{/* <div style={{ width:'16vw'}}> */}
			<Card style={{height:"37.3vh",width:"285px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} bodyStyle={{padding:0,paddingTop:"3vh"}}>
				{" "}
				{loading ? (
					<div>Loading...</div>
				) : (
					<>
						<Doughnut data={chartData} options={options} style={{height:1}}></Doughnut>
						<p
							style={{
								fontSize: ".7rem",
								textAlign: "center",
								fontWeight: "600",
							}}
						>
							Contract Status
						</p>
					</>
				)}
			</Card>
			{/* </div> */}
		</>
	);
};

export default DoughnutChart;
