
import { _decorator, Component, Node, Vec3, SpriteFrame, CCFloat } from 'cc';
import { SlotItem } from './SlotItem';
const { ccclass, property } = _decorator;


@ccclass('ReelVisual')
export class ReelVisual extends Component {
    
    @property({ type: [SpriteFrame] }) slotIcons: SpriteFrame[] = [];
    @property({ type: [CCFloat]}) winPositions = [];

    private finalReelYPos: number = -710; // initial +710, final -710
    private isSpinning: boolean = false;
    private isLastSpin: boolean = false;
    private fixedSpinDistance: number = 26.25; // 1 complete row down is 105
    private initialReelPos: Vec3 = null;
    private selectedWinner: number = 0;

    @property({type: [SlotItem]})
        slots: SlotItem[] = [];


    start () {
        this.initialReelPos = this.node.getPosition();
    }

    update (deltaTime: number) {
        if(this.isSpinning){ 

            this.node.setPosition(new Vec3(this.initialReelPos.x, this.node.position.y - this.fixedSpinDistance, this.initialReelPos.z));

            if(this.isLastSpin){
                
                // handle last iterations

                if(this.node.position.y <= this.winPositions[this.selectedWinner]){
                    //Stop at winning position
                    this.node.setPosition(new Vec3(this.initialReelPos.x, this.winPositions[this.selectedWinner], this.initialReelPos.z));
                    this.isSpinning = false;
                    this.isLastSpin = false;
                }
            }
            else{
                if(this.node.position.y <= this.finalReelYPos){ // ha llegado al final, reset
                    this.node.setPosition(this.initialReelPos);
                    // Set first 3 symbols = to last 3 symbols
                }
            }
        }
    }


    spinReel(selectedValue: number){
        this.selectedWinner = selectedValue;
        this.isSpinning = true;
    }

    stopSpinning(){
        this.isLastSpin = true;
    }

    // Assign values and icons to all slotItems
    initializeSlotArrayIcons(array: number[]){
        if(array.length != this.slots.length){
            console.log("Error while initializing reels, array length differs");
            return
        }
        for(var i = 0; i < array.length; i++){
            this.slots[i].setSprite(this.slotIcons[array[i]]);
        }
    }
}
