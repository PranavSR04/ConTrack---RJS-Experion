export interface NotificationType{
    log_id: number;
    contract_id:number| null;
    msa_id:number| null;
    contract_ref_id: number | null;
    msa_ref_id: number | null;
    client_name:string;
    performed_by: number | null;
    action: string;
    updated_at:Date;
    
}
export interface NotificationProps {
    notification: NotificationType;
    difference: string;
    actionStyle:string;
    cardStyle:string;
    stylenames:string;
    ItemClickHandler: (notification: NotificationType) => void;
}
export interface NotificationHandlerProps {
    notification: NotificationType;
}
