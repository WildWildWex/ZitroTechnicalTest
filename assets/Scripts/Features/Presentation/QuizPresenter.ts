
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Quiz} from '../Quiz';

@ccclass('QuizPresenter')
export class QuizPresenter extends Component {
    // [1]
    // dummy = '';

    @property({type: [Quiz]})
    public QuizPool: Quiz[] = []


    start(){
        console.log(this.QuizPool.toString());
    }
    
}

