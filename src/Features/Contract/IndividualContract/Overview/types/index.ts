export interface OverviewHandlerType {
    getOverview: (responses: any) => void;
  }
  
  export interface OverviewPropType {
    dateOfSignature: string;
    startDate: string;
    endDate: string;
    estimatedAmount: number;
    loading: boolean;
    region: string;
    contractTerm: number | undefined;
    isCompletedCount: number;
    milestoneCount: number;
    totalRevenue: number;
    revenueGenerated: number;
  }
  