
import { _decorator, Component, Node, CCInteger } from 'cc';
import { ReelVisual } from '../Visuals/ReelVisual';
import { SlotMachineVisual } from '../Visuals/SlotMachineVisual';
import { RandomGenerator } from '../../Domain/Use Cases/RandomGenerator';
import { PrizeChecker } from '../../Domain/Use Cases/PrizeChecker';
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
    private reel1Array:number[] = null;
    private reel2Array:number[] = null;
    private reel3Array:number[] = null;


    randomGenerator = new RandomGenerator;
    prizeChecker = new PrizeChecker;

    onLoad(){
        // Randomly assign slot values/sprites to reels
        this.reel1Array = this.randomGenerator.generateRandomArray(this.slotArrayLength);
        this.reel2Array = this.randomGenerator.generateRandomArray(this.slotArrayLength);
        this.reel3Array = this.randomGenerator.generateRandomArray(this.slotArrayLength);

        this.reel1.initializeSlotArrayIcons(this.reel1Array);
        this.reel2.initializeSlotArrayIcons(this.reel2Array);
        this.reel3.initializeSlotArrayIcons(this.reel3Array);
    }

    public async onSpinClicked(event: Event, customEventData){

        if(this.isSpinning)
            return;

        this.isSpinning = true;
        
        // Generate winning combination
        this.reel1Win = this.randomGenerator.getRandomNumber(this.slotArrayLength);
        this.reel2Win = this.randomGenerator.getRandomNumber(this.slotArrayLength);
        this.reel3Win = this.randomGenerator.getRandomNumber(this.slotArrayLength);

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
        let isWin = false;
        isWin = this.prizeChecker.checkPrizes(this.reel1Array[this.reel1Win],this.reel2Array[this.reel2Win], this.reel3Array[this.reel3Win]);
        
        if(isWin)
                await this.smVisual.displayWinFeedback();

        this.isSpinning = false;
    }
}
