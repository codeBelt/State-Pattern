///<reference path='../interfaces/IVendingState.ts'/>
///<reference path='../views/VendingMachineContext.ts'/>

module namespace {

    export class NoCashState implements IVendingState {

        private _stateContext:VendingMachineContext;

        constructor(stateContext:VendingMachineContext) {
            this._stateContext = stateContext;
        }

        public insertCash(amount:number):void {
            console.log("Money was added:", amount);

            this._stateContext.currentCashAmount = amount;
            this._stateContext.setState( this._stateContext.getHasCashState() );
        }

        public requestItem(itemId:number):void {
            console.log("Please add more money.");
        }

        public ejectCash():void {
            console.log("No money to return.");
        }

    }
}