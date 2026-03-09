
import { _decorator, CCInteger} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Quiz')
export class Quiz
{
    @property({type: String})
    Pregunta: String = null;
    @property({type: String})
    Respuesta: string[] = [];
    @property({type: CCInteger, min: 0, max: 2})
    rightAnswerIndex: number;
;}
