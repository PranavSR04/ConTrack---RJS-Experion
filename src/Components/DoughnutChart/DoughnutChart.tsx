import { DougnutChartPropsType, apiData } from './types';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';

const DoughnutChart = ({loading, chartData, options}:DougnutChartPropsType) => {    
  return (
    <>
    <div style={{ width:'14.4rem',height:'14.4rem'}}>
   <Card style={{ height:'14.2rem'}}> {loading?<div>Loading...</div>:<><Doughnut data={chartData} options={options}></Doughnut>
    <p style={{fontSize:'.8rem',textAlign:'center',fontWeight:'600'}}>Contract Status</p></>}
  </Card>
      </div>
    </>
  )
}

export default DoughnutChart
