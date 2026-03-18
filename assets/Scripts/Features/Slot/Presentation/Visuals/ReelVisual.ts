
import { _decorator, Component, Node } from 'cc';
import { SlotItem } from '../../Domain/Entities/SlotItem';
const { ccclass, property } = _decorator;


@ccclass('ReelVisual')
export class ReelVisual extends Component {
    

    @property({type: [SlotItem]})
        slots: SlotItem[] = [];

    start () {
        
    }

    // update (deltaTime: number) {
    //     
    // }

    spinReel(seconds: number){
        // Spin for given seconds
    }
}

/**
 * Se encarga de hacer girarse a si mismo, al llegar al limite vuelve a su posicion inicial
 * https://maxmariodev.itch.io/slot-machine-demo-made-with-cocos-creator 
 * Setea tambien las imagenes? Si es asi, cuando lo hace?
 * Ha de dar vueltas durante el tiempo indicado
 */
