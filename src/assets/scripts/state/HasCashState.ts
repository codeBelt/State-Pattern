///<reference path='../interfaces/IVendingState.ts'/>
///<reference path='../views/VendingMachineContext.ts'/>

module namespace {

    export class HasCashState implements IVendingState {

        private _stateContext:VendingMachineContext;

        constructor(stateContext:VendingMachineContext) {
            this._stateContext = stateContext;
        }

        public insertCash(amount:number):void {
            this._stateContext.currentCashAmount += amount;

            console.log("Total money added:", this._stateContext.currentCashAmount)
        }

        public requestItem(itemId:number):void {
            var product:any = this._stateContext.products[itemId];
            var totalCash = this._stateContext.currentCashAmount;
            var moneyLeftOver:number = totalCash - product.price;

            if (moneyLeftOver >= 0) {
                this._stateContext.currentCashAmount = moneyLeftOver;

                console.log("Enjoy your:", product.name);

                if (moneyLeftOver === 0) {
                    this._stateContext.setState( this._stateContext.getNoCashState() );
                }
            } else {
                console.log("Please add more money for this item.");
            }
        }

        public ejectCash():void {
            console.log("Return money amount:", this._stateContext.currentCashAmount);

            this._stateContext.setState( this._stateContext.getNoCashState() );
        }

    }
}