
import { _decorator, Component, Node } from 'cc';
import { SceneManager } from '../Domain/SceneManager';
const { ccclass } = _decorator;

@ccclass('LoadSceneButton')
export class LoadSceneButton extends Component {

    public onClick(event: Event, customEventData){
        console.log(customEventData);
        SceneManager.instance.loadScene(customEventData);
    }
}
