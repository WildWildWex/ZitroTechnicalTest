
import { _decorator, CCInteger, CCString} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Quiz')
export class Quiz
{
    @property({type: CCString})
    Pregunta: string = null;
    @property({type: CCString})
    Respuesta: string[] = [];
    @property({type: CCInteger, min: 0, max: 2})
    rightAnswerIndex: number = 0;
;}
