
import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ClockVisual')
export class ClockVisual extends Component {
    
    @property({type: Label})
    clockLabel: Label = null;
    
    updateClock(time: string){
        this.clockLabel.string = time;
    }
}

