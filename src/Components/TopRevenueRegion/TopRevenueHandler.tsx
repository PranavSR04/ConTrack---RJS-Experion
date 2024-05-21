import React, { useState, useEffect } from 'react';
import { getTopRevenueRegion } from './api/getTopRevenueRegion';
import { topRevenueRegionType } from './type';
import TopRevenueRegion from './TopRevenueRegion';

const TopRevenueHandler = () => {

    const [barChartData, setBarChartData] = useState<topRevenueRegionType[]>([]);

    const fetchTopRevenueRegions = async () => {
        try {
            const res = await getTopRevenueRegion();
            const data = res.data.map((item: { region: string; total_amount: number; }) => ({
                region: item.region,
                revenue: item.total_amount
            }));

            setBarChartData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTopRevenueRegions();
    }, []);

    const data = {
        labels: barChartData.map((item: { region: string; }) => item.region),
        datasets: [
            {
                label: 'Revenue by Region',
                data: barChartData.map((item: { revenue: number; }) => item.revenue),
                backgroundColor: [
                    '#0091D5',
                    '#0091D5',
                    '#0091D5',
                ],
                borderColor: [
                    '#0091D5',
                    '#0091D5',
                    '#0091D5',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (

       <TopRevenueRegion
       fetchTopRevenueRegions={fetchTopRevenueRegions}
       barChartData={barChartData}
       data={data}
       />

    );
}

export default TopRevenueHandler;
