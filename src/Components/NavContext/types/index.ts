export type NavPropType={
    showDrawer:()=>void;
    open:boolean;
    onClose:()=>void;
    setActiveNotificationCount:React.Dispatch<React.SetStateAction<number>>
    activeNotificationCount:number ;
    setAdded:React.Dispatch<React.SetStateAction<boolean>>;
    added:boolean;
    setRenew:React.Dispatch<React.SetStateAction<boolean>>;
    renew:boolean;
    setEdited:React.Dispatch<React.SetStateAction<boolean>>;
    edited:boolean;
    setContractAddToast:React.Dispatch<React.SetStateAction<boolean>>;
    contractAddToast:boolean;
    setContractEditToast:React.Dispatch<React.SetStateAction<boolean>>;
    contractEditToast:boolean;
    setContractCloseToast:React.Dispatch<React.SetStateAction<boolean>>;
    contractCloseToast:boolean;
}