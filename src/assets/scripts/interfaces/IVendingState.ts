interface IVendingState {
    insertCash(amount:number):void;
    requestItem(itemId:number):void;
    ejectCash():void
}