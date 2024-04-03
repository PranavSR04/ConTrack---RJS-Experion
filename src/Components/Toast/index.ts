type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface ToastProps{
    message:string;
    messageType:NotificationType
}

