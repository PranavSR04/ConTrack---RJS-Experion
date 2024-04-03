export interface apiData{
        total:string,
        active: string,
        progress: string,
        expiring: string,
        closed: string,
        Expired: string
}

export interface options {
    plugins: {
        legend: {
            labels: {
                font: {
                    size: number;
                };
                boxWidth:number;  
            };
        };
    };
}

export interface chartData {
    labels: string[];
    datasets: {
        data: (string | number)[];
        backgroundColor: string[];
    }[];
}

export interface DougnutChartPropsType{
    loading:boolean;
    chartData:chartData;
    options:options;

}