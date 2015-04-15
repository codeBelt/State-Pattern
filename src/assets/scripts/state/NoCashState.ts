///<reference path='../interfaces/IVendingState.ts'/>
///<reference path='../views/VendingMachineContext.ts'/>

module namespace {

    export class NoCashState implements IVendingState {

        private _stateContext:VendingMachineContext;

        constructor(stateContext:VendingMachineContext) {
            this._stateContext = stateContext;
        }

        public insertCash(amount:number):void {
            this._stateContext.currentMessage = 'Money added.';

            this._stateContext.currentCashAmount = amount;
            this._stateContext.setState( this._stateContext.getHasCashState() );
        }

        public requestItem(itemId:number):void {
            this._stateContext.currentMessage = 'Please add more money.';
        }

        public ejectCash():void {
            this._stateContext.currentMessage = 'No money to return.';
        }

    }
}