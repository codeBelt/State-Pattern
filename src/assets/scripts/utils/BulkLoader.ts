///<reference path='../interfaces/IDataStore.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/BaseEvent.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

module namespace {

    export class BulkLoader {

        private static _dataStores:Array<IDataStore> = [];
        private static _eventDispatcher:EventDispatcher = new EventDispatcher();

        public static addFile(dataStore:IDataStore, key:string):void {
            BulkLoader._dataStores[key] = dataStore;
        }

        public static getFile(key:string):IDataStore {
            return BulkLoader._dataStores[key];
        }

        public static getImage(key:string):HTMLImageElement {
            var imageLoader:IDataStore = BulkLoader.getFile(key);
            return imageLoader.data;
        }

        public static load():void {
            for (var key in BulkLoader._dataStores) {
                var dataStore:IDataStore = BulkLoader._dataStores[key];
                dataStore.addEventListener(LoaderEvent.COMPLETE, BulkLoader.onLoadComplete, BulkLoader);
                dataStore.load();
            }
        }

        public static addEventListener(type:string, callback:Function, scope:any, priority:number = 0):void {
            BulkLoader._eventDispatcher.addEventListener(type, callback, scope, priority);
        }

        public static removeEventListener(type:string, callback:Function, scope:any):void {
            BulkLoader._eventDispatcher.removeEventListener(type, callback, scope);
        }

        public static dispatchEvent(type:any, data:any = null):void {
            var event:any = type;

            if (typeof event === 'string') {
                event = new BaseEvent(type, data);
            }

            event.target = BulkLoader;
            event.currentTarget = BulkLoader;

            BulkLoader._eventDispatcher.dispatchEvent(event);
        }

        private static onLoadComplete(event:LoaderEvent):void {
            event.target.removeEventListener(LoaderEvent.COMPLETE, BulkLoader.onLoadComplete, BulkLoader);

            for (var key in BulkLoader._dataStores) {
                var dataStore:IDataStore = BulkLoader._dataStores[key];
                if (dataStore.complete === false) {
                    return;
                }
            }

            BulkLoader._eventDispatcher.dispatchEvent(LoaderEvent.LOAD_COMPLETE);
        }

    }
}