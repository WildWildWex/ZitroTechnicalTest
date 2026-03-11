
import { _decorator, Component, Node, director, game } from 'cc';
const { ccclass, } = _decorator;
 
@ccclass('SceneManager')
export class SceneManager extends Component {
   
    private static _instance: SceneManager;

    public static get instance(): SceneManager {
        return this._instance;
    }

    onLoad(){
        if(SceneManager.instance != null){
            this.destroy();
            return;
        }
        else{
            SceneManager._instance = this;
        }

        this.node.removeFromParent();
        game.addPersistRootNode(this.node);
        
    }

    loadScene(scene: string){
        director.loadScene(scene);
    }

    loadMainMenu(){
        director.loadScene("MainMenu");
    }

    loadGame1(){
        director.loadScene("QuizGame");
    }

    loadGame2(){
        director.loadScene("SlotGame");
    }

    preloadMainMenu(){
        director.preloadScene("MainMenu");
    }

    preloadGame1(){
        director.preloadScene("QuizGame");
    }

    preloadGame2(){
        director.preloadScene("SlotGame");
    }
}