
import { _decorator, Component, Node } from 'cc';
import { ProjectManager } from '../Core/ProjectManager';
const { ccclass } = _decorator;

@ccclass('LoadSceneButton')
export class LoadSceneButton extends Component {

    public onClick(event: Event, customEventData){
        console.log(customEventData);
        ProjectManager.instance.loadScene(customEventData);
    }
}
