export interface apiData{
        region:string,
        contractCount: number
}

export interface data {
        labels: any;
        datasets: {
            label: string;
            data: any;
            backgroundColor: string;
            borderColor: string;
            borderWidth: number;
        }[];
    }

    export interface optionType {
        scales: {
            xAxes: {
                ticks: {
                    beginAtZero: boolean;
                };
            }[];
        };
    }