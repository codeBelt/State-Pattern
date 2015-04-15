///<reference path='DisplayObject.ts'/>

module namespace {

    export class CanvasElement extends DisplayObject {

        constructor(canvasId:string) {
            super();

            this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
            this.$canvas = $(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.width = this.canvas.width;
            this.height = this.canvas.height;

            // Add mouse event listeners to canvas element
            this.$canvas.addEventListener('mousedown', this.onPress, this);
            this.$canvas.addEventListener('mousemove', this.onMove, this);
            this.$canvas.addEventListener('mouseup', this.onRelease, this);
            this.$canvas.addEventListener('mouseout', this.onCancel, this);

            // Add touch event listeners to this.$canvas element
            this.$canvas.addEventListener('touchstart', this.onPress, this);
            this.$canvas.addEventListener('touchmove', this.onMove, this);
            this.$canvas.addEventListener('touchend', this.onRelease, this);
            this.$canvas.addEventListener('touchcancel', this.onCancel, this);
        }

        /**
         * @overridden DisplayObject.disable
         */
        public disable():void {
            if (this.isEnabled === false) { return; }

            // Disable the child objects and remove any event listeners.

            super.disable();
        }

        public getMousePos(event:MouseEvent|JQueryEventObject):{x: number; y: number } {
            var rect = this.canvas.getBoundingClientRect();

            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        public getObjectUnderPoint(x:number, y:number):DisplayObject {
            var foundItem:DisplayObject = null;

            for (var i = this.numChildren - 1; i >= 0; i--) {
                if (this.children[i].visible === true) {
                    if (this.hitTest(this.children[i], x, y)) {
                        foundItem = this.children[i];
                        break;
                    }
                }
            }

            return foundItem;
        }

        public getObjectsUnderPoint(x:number, y:number):Array<DisplayObject> {
            var list = [];

            for (var i = this.numChildren - 1; i >= 0; i--) {
                if (this.hitTest(this.children[i], x, y)) {
                    list.push(this.children[i]);
                }
            }
            return list;
        }

        /**
         * @overridden DisplayObject.render
         */
        public render():void {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }

        public hitTest(displayObject:DisplayObject, mouseX:number, mouseY:number):boolean {
            if(mouseX >= displayObject.x && mouseX <= displayObject.x + displayObject.width && mouseY >= displayObject.y && mouseY <= displayObject.y + displayObject.height){
                return true;
            } else {
                return false;
            }
        }

        private onPress(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);

            event.target = <any>this.getObjectUnderPoint(mousePos.x, mousePos.y);
            event.currentTarget = <any>this;

            this.dispatchEvent(event);
        }

        private onMove(event:MouseEvent|JQueryEventObject):void {
            event.target = <any>this;
            event.currentTarget = <any>this;

            var mousePos = this.getMousePos(event);
            var displayObject:DisplayObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            if (displayObject !== null && displayObject.mouseEnabled === true) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }

            this.dispatchEvent(event);
        }

        private onRelease(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);

            event.target = <any>this.getObjectUnderPoint(mousePos.x, mousePos.y);
            event.currentTarget = <any>this;

            this.dispatchEvent(event);
        }

        private onCancel(event:MouseEvent|JQueryEventObject):void {
            event.target = <any>this;
            event.currentTarget = <any>this;

            this.dispatchEvent(event);
        }

    }
}