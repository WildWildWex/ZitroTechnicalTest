
import { _decorator, Component, Node, director, game } from 'cc';
const { ccclass, property, } = _decorator;
 
@ccclass('ProjectManager')
export class ProjectManager extends Component {
   
    private static _instance: ProjectManager;

    public static get instance(): ProjectManager {
        return this._instance;
    }

    onLoad(){
        if(ProjectManager.instance != null){
            this.destroy();
            return;
        }
        else{
            ProjectManager._instance = this;
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