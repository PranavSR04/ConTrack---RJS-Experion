

export interface topRevenueRegionType{
    region : string;
    revenue : number;
}

export interface TopRevenueRegionHandlerPropType{
    barChartData:topRevenueRegionType[];
    fetchTopRevenueRegions: () => Promise<void>
    data: {
        labels: any[];
        datasets: {
            label: string;
            data: any[];
            backgroundColor: string[];
            borderColor: string[];
            borderWidth: number;
        }[];
    }
    
}