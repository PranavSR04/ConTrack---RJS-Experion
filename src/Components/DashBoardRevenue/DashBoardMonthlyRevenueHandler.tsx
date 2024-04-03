
import React, { useEffect, useState } from 'react';
import { fetchRevenueProjection } from '../../Features/RevenueProjection/api/getRevenueProjection';
import { AxiosError } from 'axios';
import DashBoardRevenue from './DashBoardRevenue';
//Component to handle monthly revenue data fetching and rendering.
const DashBoardMonthlyRevenueHandler = () => {
  const [revenueData, setRevenueData] = useState<{ [key: string]: number } | undefined>();
  const [error, setError] = useState<any>();
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState<number>(0);
  const [previousMonthRevenue,setPreviousMonthRevenue]=useState<number>(0);
  const responsetype='Month';
  useEffect(() => {
    fetchMonthRevenue();
  }, []);
 // Function to fetch monthly revenue data
  const fetchMonthRevenue = async () => {
    const requestBody = {
      type: 'monthly',
    };
 
    try {
        // Fetch revenue projection data
      const { data }: { data: { [key: string]: number } } = await fetchRevenueProjection(undefined, requestBody);
      console.log(data)
      if (data instanceof AxiosError) {
        console.log(data.response?.data);
        setError(data.response?.data);
      } else {
         // Get current month and its revenue
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
        const currentYear = currentDate.getFullYear();
        const currentMonthKey = `${currentMonth}, ${currentYear}`;
         // Get previous month and its revenue
        const currentMonthRevenue = data[currentMonthKey];
        setCurrentMonthRevenue(currentMonthRevenue);
        setRevenueData(data);
        currentDate.setMonth(currentDate.getMonth() - 1);
        const previousMonth = currentDate.toLocaleString('en-US', { month: 'long' });
        const previousYear = currentDate.getFullYear();
        const previousMonthKey = `${previousMonth}, ${previousYear}`;
        const previousMonthRevenue = data[previousMonthKey] || 0;
        setPreviousMonthRevenue(previousMonthRevenue);
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
      setError(error);
    }
  };

  return (
  <DashBoardRevenue currentMonthRevenue={currentMonthRevenue} previousMonthRevenue={previousMonthRevenue} responsetype={responsetype}/>
  );
};


export default DashBoardMonthlyRevenueHandler
