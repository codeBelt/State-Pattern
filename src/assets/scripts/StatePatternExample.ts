///<reference path='_declare/jquery.d.ts'/>
///<reference path='_declare/jquery.eventListener.d.ts'/>
///<reference path='_declare/greensock.d.ts'/>
///<reference path='utils/ImageLoader.ts'/>
///<reference path='utils/BulkLoader.ts'/>
///<reference path='events/LoaderEvent.ts'/>
///<reference path='views/VendingMachine.ts'/>

module namespace {

    export class StatePatternExample {

        private static BASE_PATH:string = 'assets/media/images/';

        private _vendingMachine:VendingMachine = null;

        constructor() {
            this.loadAssets();
        }

        private loadAssets():void {
            BulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onAssetsLoadComplete, this);
            BulkLoader.addFile(new ImageLoader(StatePatternExample.BASE_PATH + 'vending-machine.png'), 'vending-machine');
            BulkLoader.addFile(new ImageLoader(StatePatternExample.BASE_PATH + 'click-to-add-money.png'), 'click-to-add-money');
            BulkLoader.load();
        }

        private onAssetsLoadComplete(event:LoaderEvent):void {
            this._vendingMachine = new VendingMachine('canvasId');
        }


    }
}
