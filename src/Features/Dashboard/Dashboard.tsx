import { Card } from "antd";
import styles from "./dashboard.module.css";
import DashBoardNotificationListHandler from "../../Components/DashBoardNotificationList/DashBoardNotificationListHandler";
import ScatterPlotHandler from "../../Components/RevenueScatterPlot/ScatterPlotHandler";
import BarChartHandler from "../DashBoardBarChart/BarChartHandler";
import DashBoardMonthlyRevenueHandler from "../../Components/DashBoardRevenue/DashBoardMonthlyRevenueHandler";
import DashBoardQuaterlyRevenueHandler from "./../../Components/DashBoardRevenue/DashBoardQuaterlyRevenueHandler";
import DashBoardYearlyRevenueHandler from "../../Components/DashBoardRevenue/DashBoardYearlyRevenueHandler";
import TopRevenueHandler from "../../Components/TopRevenueRegion/TopRevenueHandler";
import DashBoardContractCountHandler from "../../Components/DashBoardContractsCount/DashBoardContractCountHandler";
import DashBoardMsaCountHandler from "../../Components/DashBoardContractsCount/DashBoardMsaCountHandler";
import DoughnutChartHandler from "../../Components/DoughnutChart/DoughnutChartHandler";
import RegionHorizontalBar from "../../Components/RegionHorizontalBar/RegionHorizontalBar";

const Dashboard = () => {
  return (
    < >
      <div className={styles["dashboard-div1"]}>
        <div className={styles["dash-row1-div"]}>
          <div className={styles["dash-revenue-div"]}>
            <div className={styles["dash-revenue-div-month"]}>
              <DashBoardMonthlyRevenueHandler />
            </div>
            <div className={styles["dash-revenue-div-month"]}>
              <DashBoardQuaterlyRevenueHandler />
            </div>
            <div className={styles["dash-revenue-div-month"]}>
              <DashBoardYearlyRevenueHandler />
            </div>

            <div className={styles["dash-revenue-div-month"]}>
              <DashBoardContractCountHandler />
            </div>
            <div className={styles["dash-revenue-div-month"]}>
              <DashBoardMsaCountHandler />
            </div>
          </div>
          <div className={styles["dash-revenue-div-notifi"]}>
            <DashBoardNotificationListHandler />
          </div>
        </div>
    <div className={styles['dash-row1-charts']}>
    <div className={styles['dash-row1-barchart']}>
      <Card className={styles['dash-row2-ducharts']}><BarChartHandler/> </Card>  
      </div> 
      <div className={styles['dash-row1-doughnut']}>     
      <DoughnutChartHandler />
      </div> 
    </div>
<div  className={styles['dash-row2-charts']}>
  <Card style={{backgroundColor:'white',marginRight:'.8rem'}}>      
    <ScatterPlotHandler/>
      </Card> 
 <Card style={{backgroundColor:'white',marginRight:'.8rem'}}>
 <RegionHorizontalBar/>
 </Card>
 <Card style={{backgroundColor:'white', }}>
 <TopRevenueHandler/>
 </Card>
</div>
      </div>
    </>
  );
};

export default Dashboard;
