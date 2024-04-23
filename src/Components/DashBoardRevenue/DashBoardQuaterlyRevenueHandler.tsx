import React, { useEffect, useState } from 'react';
import { fetchRevenueProjection } from '../../Features/RevenueProjection/api/getRevenueProjection';
import { AxiosError } from 'axios';
import DashBoardRevenue from './DashBoardRevenue';
//Component to handle quarterly revenue data fetching and rendering.
const DashBoardQuaterlyRevenueHandler = () => {
  const [revenueData, setRevenueData] = useState<{ [key: string]: number } | undefined>();
  const [error, setError] = useState<any>();
  const [currentQuarterRevenue, setCurrentQuarterRevenue] = useState<number>(0);
  const [previousQuarterRevenue, setPreviousQuarterRevenue] = useState<number>(0);
  const responsetype='Quarter';
  useEffect(() => {
    fetchQuarterlyRevenue();
  }, []);
 // Function to fetch quarterly revenue data
  const fetchQuarterlyRevenue = async () => {
    const requestBody = {
      type: 'quarterly',
    };
   
    try {
       // Fetch revenue projection data
      const { data }: { data: { [key: string]: number } } = await fetchRevenueProjection(undefined, undefined, requestBody);
      if (data instanceof AxiosError) {
        console.log(data.response?.data);
        setError(data.response?.data);
      } else {
        // Get current quarter and its revenue
        const currentQuarter = getCurrentQuarter();
        const currentQuarterRevenue = data[currentQuarter] || 0;
        setCurrentQuarterRevenue(currentQuarterRevenue);
        // Get previous quarter and its revenue
        const previousQuarter = getPreviousQuarter(currentQuarter);
        const previousQuarterRevenue = data[previousQuarter] || 0;
        setPreviousQuarterRevenue(previousQuarterRevenue);

        setRevenueData(data);
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
      setError(error);
    }
  };
// Function to get current quarter
  const getCurrentQuarter = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const quarter = Math.ceil(currentMonth / 3);
    console.log(quarter)
    return `${currentYear}-Q${quarter}`;
  };
// Function to get previous quarter
  const getPreviousQuarter = (currentQuarter: string) => {
    const [year, quarterStr] = currentQuarter.split('-');
    const quarter = parseInt('1');
    const previousQuarter = quarter === 1 ? 4 : quarter - 1;
    const previousYear = quarter === 1 ? parseInt(year) - 1 : parseInt(year);
    console.log(quarter)
    console.log(previousQuarter);
    return `${previousYear}-Q${previousQuarter}`;
    
  };
  return (
    <DashBoardRevenue currentMonthRevenue={currentQuarterRevenue} previousMonthRevenue={previousQuarterRevenue} responsetype={responsetype} />
  );
};

export default DashBoardQuaterlyRevenueHandler;
