
import { _decorator, Component, Node, UIOpacity, tween } from 'cc';
import {wait} from '../Presenters/SlotMachinePresenter'
const { ccclass, property } = _decorator;

@ccclass('SlotMachineVisual')
export class SlotMachineVisual extends Component {
    
    @property({type: UIOpacity})
    winLabelOpacity: UIOpacity;

    private fadeInDuration: number = 0.5;
    private fadeOutDuration: number = 1;

    async displayWinFeedback(){
        console.log("you win");
        // Wait for animation
        await new Promise<void>((resolve) => {
            tween(this.winLabelOpacity)
            .to(this.fadeInDuration, { opacity: 255 }, { easing: 'fade' })
            .call(() => resolve())
            .start();
            });

        wait(2500); 

        await new Promise<void>((resolve) => {
            tween(this.winLabelOpacity)
            .to(this.fadeOutDuration, { opacity: 0 }, { easing: 'fade' })
            .call(() => resolve())
            .start();
            });
    }
}

