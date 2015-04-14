///<reference path='../components/display/Rectangle.ts'/>

module namespace {

    export class Button extends Rectangle {

        constructor(x:number = 0, y:number = 0, width:number = 50, height:number = 50, color:string = '#FF0000') {
            super(x, y, width, height, color);
        }

    }
}