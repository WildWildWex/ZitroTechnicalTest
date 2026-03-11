
import { _decorator, Component, debug, Node } from 'cc';
import { ILoadingBar } from './ILoadingBar';
import { LoadingBarVisual } from './LoadingBarVisual';
import { SceneManager } from '../Domain/SceneManager';
const { ccclass, property, float } = _decorator;
 
@ccclass('LoadingBarPresenter')
export class LoadingBarPresenter extends Component {

    // Ideally this should be injected via a dependency injection framework, but for simplicity, we'll just reference it directly.
    @property({type: LoadingBarVisual})// Can't have a reference to an interface, so we use the visual component that implements it
    loadingBarVisual: LoadingBarVisual = null;

    @float
    minimumLoadingTime = 5;
    @float
    randomLoadingTime = 1;

    private isLoading: boolean = false;
    private totalTime: number = 0;
    private elapsed: number = 0;
     
    start(){
    this.startLoading();
    }

    startLoading() {
        // Preload Main Menu Scene
        SceneManager.instance.preloadMainMenu();
        //Simulate loading time min 5 seconds + random
        this.totalTime = this.getTotalLoadingTime();
        this.elapsed = 0;
        this.isLoading = true;
        // Reset progress to 0
        this.loadingBarVisual.setProgress(0);
    }

    getRandomLoadingTime(): number {
        return Math.random() * this.randomLoadingTime;
    }

    getTotalLoadingTime(): number {
        return this.minimumLoadingTime + this.getRandomLoadingTime();
    }

    loadMainMenu(){
        SceneManager.instance.loadMainMenu();
    }

    update (deltaTime: number) {
        if (this.isLoading) {
            this.elapsed += deltaTime;
            let progressIncrement = deltaTime / this.totalTime;
            this.loadingBarVisual.addProgress(progressIncrement);

            if (this.elapsed >= this.totalTime) {
                this.isLoading = false;
                this.loadingBarVisual.setProgress(1); // Ensure it's fully loaded
                this.loadMainMenu();
            }
        }
    }
}
