import { DougnutChartPropsType, apiData } from './types';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';

const DoughnutChart = ({loading, chartData, options}:DougnutChartPropsType) => {    
  return (
    <>
    <div style={{ width:'16vw'}}>
   <Card style={{ height: '35vh '}}> {loading?<div>Loading...</div>:<><Doughnut data={chartData} options={options}></Doughnut>
    <p style={{fontSize:'.7rem',textAlign:'center',fontWeight:'600'}}>Contract Status</p></>}
  </Card>
      </div>
    </>
  )
}

export default DoughnutChart
