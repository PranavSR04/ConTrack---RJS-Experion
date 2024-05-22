import React from "react";
import styles from "./Dashboard.module.css";
import { Card, Col, Row } from "antd";
import DashBoardMonthlyRevenueHandler from "../../Components/DashBoardRevenue/DashBoardMonthlyRevenueHandler";
import DashBoardQuaterlyRevenueHandler from "../../Components/DashBoardRevenue/DashBoardQuaterlyRevenueHandler";
import DashBoardYearlyRevenueHandler from "../../Components/DashBoardRevenue/DashBoardYearlyRevenueHandler";
import DashBoardContractCountHandler from "../../Components/DashBoardContractsCount/DashBoardContractCountHandler";
import DashBoardMsaCountHandler from "../../Components/DashBoardContractsCount/DashBoardMsaCountHandler";
import DashBoardNotificationListHandler from "../../Components/DashBoardNotificationList/DashBoardNotificationListHandler";
import BarChartHandler from "../DashBoardBarChart/BarChartHandler";
import DoughnutChartHandler from "../../Components/DoughnutChart/DoughnutChartHandler";
import ScatterPlotHandler from "../../Components/RevenueScatterPlot/ScatterPlotHandler";
import RegionHorizontalBar from "../../Components/RegionHorizontalBar/RegionHorizontalBar";
import TopRevenueHandler from "../../Components/TopRevenueRegion/TopRevenueHandler";

const Dashboard = () => {
	return (
		<div className={styles.dashboard}>
			<Row style={{paddingBottom:8}}>
				<Col className={styles.col} span={17}>
					<Row gutter={140} style={{paddingBottom:8}}>
						<Col span={4}><DashBoardMonthlyRevenueHandler /></Col>
						<Col span={4}><DashBoardQuaterlyRevenueHandler /></Col>
						<Col span={4}><DashBoardYearlyRevenueHandler /></Col>
						<Col span={4}><DashBoardContractCountHandler /></Col>
						<Col span={4}><DashBoardMsaCountHandler /></Col>
					</Row>
					<Row gutter={15}>
						<Col span={14}><Card className={styles.barchart_card} bodyStyle={{paddingTop:"5vh"}}><BarChartHandler /></Card></Col>
						<Col span={8}><DoughnutChartHandler /></Col>
					</Row>
        		</Col>
				<Col className={styles.col} span={5} ><DashBoardNotificationListHandler /></Col>
			</Row>
			<Row gutter={15}>
				<Col span={8}><Card className={styles.lastrow_card}><ScatterPlotHandler /></Card></Col>
				<Col span={8}><Card className={styles.lastrow_card}><RegionHorizontalBar /></Card></Col>
				<Col span={8}><Card className={styles.lastrow_card}><TopRevenueHandler /></Card></Col>
			</Row>
		</div>
	);
};

export default Dashboard;
