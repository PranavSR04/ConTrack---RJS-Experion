import { NotificationType } from "../../Notification/types";


export interface DashBoardNotificationListPropType{
    notifications: NotificationType[];
    isLoading: boolean;
    isError: boolean;
    error: string;
}