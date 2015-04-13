///<reference path='../components/display/CanvasElement.ts'/>
///<reference path='../components/display/Bitmap.ts'/>
///<reference path='../components/display/Rectangle.ts'/>
///<reference path='../views/Button.ts'/>
///<reference path='../utils/BulkLoader.ts'/>

module namespace {

    export class VendingMachine extends CanvasElement {

        private _machineBg:Bitmap;

        constructor(canvasId:string) {
            super(canvasId);

            this.canvas.addEventListener('mouseup', this.onStageClick.bind(this));

            this.createChildren();
        }

        private createChildren():void {
            var image:HTMLImageElement = BulkLoader.getImage('vending-machine');

            this._machineBg = new Bitmap(image);
            this._machineBg.x = 10;
            this._machineBg.y = 10;
            this.addChild(this._machineBg);


            var hitButton:Button = new Button(this._machineBg.x + 183, this._machineBg.y + 178, 20, 20, 'yellow');
            hitButton.name = 'asdfasdf';
            this.addChild(hitButton);

            this.update();

//            insertCashState
//            acceptSelectionState
//            cancelState
        }

        private onStageClick(event:MouseEvent):void {
            var mousePos = this.getMousePos(event);
            var item = <any>this.getObjectUnderPoint(mousePos.x, mousePos.y);

            console.log('mousePos', mousePos);
            console.log("item", item, item.name);
        }
    }
}