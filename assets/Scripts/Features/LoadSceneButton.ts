
import { _decorator, Component, Node } from 'cc';
import { ProjectManager } from '../Core/ProjectManager';
const { ccclass, property } = _decorator;

 
@ccclass('LoadSceneButton')
export class LoadSceneButton extends Component {

    public onClick(scene: string){
        ProjectManager.instance.loadScene(scene);
    }
}
