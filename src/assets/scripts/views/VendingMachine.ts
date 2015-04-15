///<reference path='../components/display/CanvasElement.ts'/>
///<reference path='../components/display/Bitmap.ts'/>
///<reference path='../components/display/Rectangle.ts'/>
///<reference path='../views/Button.ts'/>
///<reference path='../utils/BulkLoader.ts'/>

module namespace {

    export class VendingMachine extends CanvasElement {

        constructor(canvasId:string) {
            super(canvasId);

            this.addEventListener('mousedown', this.onClick, this);

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
            this.addChild(addMoneyButton);

            var cancelButton = new Button(198 + machineBg.x, 142 + machineBg.y, 15, 15, 'yellow');
            cancelButton.name = 'cancelButton';
            this.addChild(cancelButton);

            var posX:number;
            var posY:number;
            var hitButton:Button;
            var selectButton = 8;
            for (var i:number = 0; i < selectButton; i++) {
                posX = 183 + machineBg.x;
                posY = (33 * i) + machineBg.y + 178;

                hitButton = new Button(posX, posY, 20, 20, 'yellow');
                hitButton.name = 'selection_' + i;
                this.addChild(hitButton);
            }

            this.update();

//            insertCashState
//            acceptSelectionState
//            cancelState
        }

        private onClick(event):void {
            var button:Button = <Button>event.target;
            console.log(button.name);
        }
    }
}