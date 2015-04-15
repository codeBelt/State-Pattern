///<reference path='../components/display/CanvasElement.ts'/>
///<reference path='../components/display/Bitmap.ts'/>
///<reference path='../components/display/Rectangle.ts'/>
///<reference path='../views/Button.ts'/>
///<reference path='../utils/BulkLoader.ts'/>

///<reference path='../interfaces/IVendingState.ts'/>
///<reference path='../state/HasCashState.ts'/>
///<reference path='../state/NoCashState.ts'/>


module namespace {

    export class VendingMachineContext extends CanvasElement {

        private _hasCashState:HasCashState;
        private _noCashState:NoCashState;

        private _currentState:IVendingState;

        public currentCashAmount:number = 0;

        public products:Array<any> = [
            {name: 'NUROFEN', price: 200},
            {name: 'tic tac', price: 150},
            {name: 'hello', price: 1000},
            {name: 'MALT', price: 300},
            {name: 'LYNX', price: 150},
            {name: 'Vaseline', price: 180},
            {name: 'RedBull', price: 200},
            {name: 'naka.', price: 220}
        ];

        constructor(canvasId:string) {
            super(canvasId);

            this._hasCashState = new HasCashState(this);
            this._noCashState = new NoCashState(this);

            this._currentState = this._noCashState;

            this.createChildren();
        }

        private createChildren():void {
            var image:HTMLImageElement = BulkLoader.getImage('vending-machine');

            var machineBg:Bitmap = new Bitmap(image);
            machineBg.x = 10;
            machineBg.y = 10;
            this.addChild(machineBg);

            image = BulkLoader.getImage('click-to-add-money');

            var addMoneyButton = new Bitmap(image);
            addMoneyButton.name = 'addMoneyButton';
            addMoneyButton.x = machineBg.x + machineBg.width + 35;
            addMoneyButton.y = 30;
            addMoneyButton.mouseEnabled = true;
            addMoneyButton.addEventListener('mousedown', this.onAddMoney, this);
            this.addChild(addMoneyButton);

            var cancelButton = new Button(198 + machineBg.x, 142 + machineBg.y, 15, 15, 'yellow');
            cancelButton.name = 'cancelButton';
            cancelButton.alpha = 0;
            cancelButton.addEventListener('mousedown', this.onCancel, this);
            this.addChild(cancelButton);

            var posX:number;
            var posY:number;
            var hitButton:Button;
            var selectButton = 8;
            for (var i:number = 0; i < selectButton; i++) {
                posX = 183 + machineBg.x;
                posY = (33 * i) + machineBg.y + 178;

                hitButton = new Button(posX, posY, 20, 20, 'yellow');
                hitButton.id = i;
                hitButton.alpha = 0;
                hitButton.name = 'selection_' + i;
                hitButton.addEventListener('mousedown', this.onSelectItem, this);
                this.addChild(hitButton);
            }

            this.update();
        }

        public setState(state:IVendingState):void {
            this._currentState = state;
        }

        public insertCash(amount:number):void {
            this._currentState.insertCash(amount);
        }

        public requestItemById(itemId:number):void {
            this._currentState.requestItem(itemId);
        }

        public ejectCash():void {
            this._currentState.ejectCash();
        }

        private onSelectItem(event):void {
            var button:Button = event.target;

            this.requestItemById(button.id);
        }

        private onCancel(event):void {
            this.ejectCash();
        }

        private onAddMoney(event):void {
            var amount:number = 25; // Cents

            this.insertCash(amount);
        }

        // Getters
        public getHasCashState():HasCashState { return this._hasCashState; }
        public getNoCashState():NoCashState { return this._noCashState; }

    }
}