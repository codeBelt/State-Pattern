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

            this._stateContext.currentMessage = 'Money added.';
        }

        public requestItem(itemId:number):void {
            var product:any = this._stateContext.products[itemId];
            var totalCash = this._stateContext.currentCashAmount;
            var moneyLeftOver:number = totalCash - product.price;

            if (moneyLeftOver >= 0) {
                this._stateContext.currentCashAmount = moneyLeftOver;

                this._stateContext.currentMessage = 'Enjoy your: ' + product.name;

                if (moneyLeftOver === 0) {
                    this._stateContext.setState( this._stateContext.getNoCashState() );
                }
            } else {
                this._stateContext.currentMessage = 'Please add more money.';
            }
        }

        public ejectCash():void {
            this._stateContext.currentMessage = 'Returned amount: ' + this._stateContext.currentCashAmount;

            this._stateContext.currentCashAmount = 0;

            this._stateContext.setState( this._stateContext.getNoCashState() );
        }

    }
}