import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup';
import styles from './DashBoardRevenue.module.css'
export interface DashBoardRevenueProps {
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  responsetype:string;
}
//Component to display dashboard revenue information.
const DashBoardRevenue = ({currentMonthRevenue,previousMonthRevenue,responsetype}:DashBoardRevenueProps) => {
  console.log(currentMonthRevenue)
console.log(previousMonthRevenue)
//if the value is undefined set to 0 or 1
  if(currentMonthRevenue===undefined){
    currentMonthRevenue=0;
  }
  if(previousMonthRevenue===0){
    previousMonthRevenue=1;
  }
  // Calculating revenue difference percentage
  const difference=((currentMonthRevenue-previousMonthRevenue)/previousMonthRevenue)*100;
  const arrowIcon = difference >= 0 ? <ArrowUpOutlined style={{ color: '#3f8600' }} data-testid="up-arrow" /> : <ArrowDownOutlined style={{ color: 'red' }} data-testid="down-arrow" />;
//return contains Countup to show count styling and statistic to show growth
  return (
    <Row gutter={16}>
    <Col span={12}>
      <Card style={{width:'135px',height:'120px',padding:'0px',transform:'scale', backgroundColor:'#f4f4f4', border:'solid 2px #f9f9f9',}}>
      <p style={{fontSize:'15px', paddingLeft:'2%', marginBottom:'0.1rem'}}>{responsetype}</p> 
      <div style={{fontSize:'15px', fontWeight:'600', marginLeft:'1.8px'}}>
      <span>USD&nbsp;</span>
      <CountUp end={currentMonthRevenue/1000.00}/>
      <span>k&nbsp;</span>
    </div>
      <Statistic className={styles.statistic}  
          value={Math.abs(difference)}
          precision={1}
          valueStyle={{ color: difference >= 0 ? '#3f8600' : 'red' }}
          prefix={arrowIcon}
          suffix="%"
          style={{marginLeft:'0.5rem', transform:'scale(1.2)', marginTop:'0.2rem'}}
        />
      </Card>
      
    </Col>
  </Row>
  )
}

export default DashBoardRevenue
