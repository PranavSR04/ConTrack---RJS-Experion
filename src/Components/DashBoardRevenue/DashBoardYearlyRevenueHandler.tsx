import React, { useEffect, useState } from 'react';
import { fetchRevenueProjection } from '../../Features/RevenueProjection/api/getRevenueProjection';
import { AxiosError } from 'axios';
import DashBoardRevenue from './DashBoardRevenue';
//Component to handle yearly revenue data fetching and rendering.
const DashBoardYearlyRevenueHandler = () => {
  const [revenueData, setRevenueData] = useState<{ [key: string]: number } | undefined>();
  const [error, setError] = useState<any>();
  const [currentYearRevenue, setCurrentYearRevenue] = useState<number>(0);
  const [previousYearRevenue, setPreviousYearRevenue] = useState<number>(0);
  const responsetype='Year';
  useEffect(() => {
    fetchYearlyRevenue();
  }, []);
 // Function to fetch yearly revenue data
  const fetchYearlyRevenue = async () => {
    const requestBody = {
      type: 'yearly',
    };

    try {
      // Fetch revenue projection data
      const { data }: { data: { [key: string]: number } } = await fetchRevenueProjection(undefined, requestBody);

      if (data instanceof AxiosError) {
        console.log(data.response?.data);
        setError(data.response?.data);
      } else {
        // Get current quarter and its revenue
        const currentYear = new Date().getFullYear();
        const currentYearRevenue = data[currentYear.toString()] || 0;
        setCurrentYearRevenue(currentYearRevenue);
        // Get previous quarter and its revenue
        const previousYear = currentYear - 1;
        const previousYearRevenue = data[previousYear.toString()] || 0;
        setPreviousYearRevenue(previousYearRevenue);

        setRevenueData(data);
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
      setError(error);
    }
  };

  return (
    <DashBoardRevenue currentMonthRevenue={currentYearRevenue} previousMonthRevenue={previousYearRevenue}   responsetype={responsetype} />
  );
};

export default DashBoardYearlyRevenueHandler;
