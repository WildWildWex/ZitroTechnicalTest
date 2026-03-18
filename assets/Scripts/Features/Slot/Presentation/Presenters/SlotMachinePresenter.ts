
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('SlotMachinePresenter')
export class SlotMachinePresenter extends Component {
   
    // Array de simbolos
    // Referencias de los reels
    //

    start () {
        
    }

    public onSpinClicked(event: Event, customEventData){
        // Generate symbols?
        // Start spinning

    }

    
}

/**
 * Referencia a los 3 reels
 * array con todos los slots?? Para que?
 * Como se chequea las condiciones de victoria?
 * https://maxmariodev.itch.io/slot-machine-demo-made-with-cocos-creator
 * Al darle al start se generan los simbolos que faltan por generarse, como se gestionan los 3 simbolos que se ven en el viewport? se descartan?
 */
