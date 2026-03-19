
import { _decorator, Component, Node, CCInteger } from 'cc';
import { ReelVisual } from '../Visuals/ReelVisual';
import { SlotMachineVisual } from '../Visuals/SlotMachineVisual';
const { ccclass, property } = _decorator;
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

@ccclass('SlotMachinePresenter')
export class SlotMachinePresenter extends Component {
   
    @property({type: SlotMachineVisual})
    smVisual: SlotMachineVisual = null;
    // Referencias de los reels
    @property({type: ReelVisual})
    reel1: ReelVisual = null;
    @property({type: ReelVisual})
    reel2: ReelVisual = null;
    @property({type: ReelVisual})
    reel3: ReelVisual = null;
    private isSpinning: boolean = false;
    private slotArrayLength: number = 16;

    private reel1Win: number = 0;
    private reel2Win: number = 0;
    private reel3Win: number = 0;

    

    onLoad(){
        // Randomly assign slot values/sprites to reels
        this.reel1.initializeSlotArray(this.generateRandomArray());
        this.reel2.initializeSlotArray(this.generateRandomArray());
        this.reel3.initializeSlotArray(this.generateRandomArray());
    }

    start () {
    }

    public async onSpinClicked(event: Event, customEventData){

        if(this.isSpinning)
            return;

        this.isSpinning = true;
        
        // Generate winning combination
        this.reel1Win = this.getRandomNumber();
        this.reel2Win = this.getRandomNumber();
        this.reel3Win = this.getRandomNumber();

        // After test, add stop logic and win conditions
        this.reel1.spinReel(this.reel1Win);
        await wait(2000);
        this.reel2.spinReel(this.reel2Win);
        await wait(2000);
        this.reel3.spinReel(this.reel3Win);
        await wait(3000);
        this.reel1.stopSpinning();
        await wait(2000);
        this.reel2.stopSpinning();
        await wait(2000);
        this.reel3.stopSpinning();
        await wait(100);
        await this.checkPrizes()
        this.isSpinning = false;
    }

    async checkPrizes(){

        if(this.reel1Win === this.reel2Win && 
            this.reel1Win === this.reel3Win){
                // Win
                await this.smVisual.displayWinFeedback();
        }
    }

    generateRandomArray(): number[]{
        // Generate random array of values with equal chances for everything
        let newArray = Array.from({length: this.slotArrayLength}, () => Math.floor(Math.random() * this.slotArrayLength));
        // last 3 values = initial 3 values
        for(var i = 0; i < 3; i++){
            let j = 3-i;
            newArray[newArray.length-j] = newArray[i]
        }
        console.log(newArray);
        return newArray;
    }

    getRandomNumber():number{
        // No puede salir ni el ultimo numero ni el primero
        let selected = false;
        let value;

        while(!selected){
            value = Math.floor(Math.random() * this.slotArrayLength);

            if(value > 0 && value < this.slotArrayLength-1)
                selected = true;
        }
        console.log(value);
        return value;
    }
}

/**
 * Referencia a los 3 reels
 * array con todos los slots?? Para que?
 * Como se chequea las condiciones de victoria?
 * https://maxmariodev.itch.io/slot-machine-demo-made-with-cocos-creator
 * Al darle al start se generan los simbolos que faltan por generarse, como se gestionan los 3 simbolos que se ven en el viewport? se descartan?
 */
