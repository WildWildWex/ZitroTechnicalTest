
import { _decorator, Component, Node, ProgressBar, } from 'cc';
import{ ILoadingBar} from './ILoadingBar';
const { ccclass, property } = _decorator;

@ccclass('LoadingBarVisual')
export class LoadingBarVisual extends Component implements ILoadingBar {
    
 @property({
        type: ProgressBar
 })
 progressBar;
   
    public getProgress(): number {
        return this.progressBar.progress;
    }

    public addProgress(value: number) {
        this.progressBar.progress += value;
        // Optionally clamp between 0 and 1 if needed
        // this.progressBar.progress = Math.max(0, Math.min(1, this.progressBar.progress));
    }
    public setProgress(value: number) {
        this.progressBar.progress = value;
    }
}
