export interface BarChartPropType{
    // data: duCountType[];
    data:{
        labels: string[];
        datasets: {
              label: string;
              data: number[];
              backgroundColor: string;
              barPercentage: number;
            }[]; 
        }
    maxDataValue:number;
}

export interface duCountType{
    du:string;
    TM:number;
    FF:number
}
