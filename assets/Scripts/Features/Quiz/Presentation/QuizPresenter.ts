
import { _decorator, CCBoolean, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Quiz} from '../Domain/Quiz';
import { QuizVisual } from './QuizVisual';
import { SceneManager } from '../../../Core/Domain/SceneManager';
import { eventHandler } from '../../../Core/Infraestructure//EventHandler';

@ccclass('QuizPresenter')
export class QuizPresenter extends Component {
   
    @property({type: CCBoolean, tooltip: "Indicates if the Inspector Quiz should be used or if we should generate a quiz by code"})
    public useInspectorQuiz: boolean = false;

    @property({type: [Quiz]})
    public QuizPool: Quiz[] = []
    
    @property({type: QuizVisual})
    quizVisual: QuizVisual = null;

    @property({type: CCInteger})
    quizPoolLength: number = 10;


    private defaultQuizPool: Quiz[] = [];
    private quizIndex: number = 0;
    private currentQuiz: Quiz = null;
    private correctAnswer: string = null;
    private quizJson: JSON;

    async start(){
        if(this.useInspectorQuiz)
        this.defaultQuizPool = this.QuizPool;
        else
        this.generateDefaultQuiz();

        eventHandler.on('onSelectAnswer', this.onSelectAnswer, this);

        await this.presentNextQuiz();
    }

    private generateDefaultQuiz()
    {
        // Simulate a Quiz Pool Generation
        // We do this to create the JSON, which should be given to us externally
        // TODO: Revisit
        for(let i = 0; i < this.quizPoolLength; i++){
            let q = new Quiz;
            q.Pregunta = "Pregunta "+ (i+1);
            q.Respuesta[0] = "Incorrecta";
            q.Respuesta[1] = "Incorrecta";
            q.Respuesta[2] = "Correcta";
            q.rightAnswerIndex = 2;
            this.defaultQuizPool.push(q);
        }

        // Convert to JSON
        let quizString = JSON.stringify(this.defaultQuizPool);
        this.quizJson = JSON.parse(quizString);
        console.log(quizString);
    }

    public async onSelectAnswer(answer: string){

        if(answer == this.correctAnswer){
            await this.quizVisual.rightAnswerFeedback();
        }
        else{
            await this.quizVisual.wrongAnswerFeedback();
        }

        this.quizIndex++;
        if(this.quizIndex == this.defaultQuizPool.length){
            // Display on end visuals
            // Load Main Menu
            eventHandler.off('onSelectAnswer', this.onSelectAnswer, this);
            await this.quizVisual.finishGameFeedback().then(_=> { SceneManager.instance.loadMainMenu();});
        }
        else{
            await this.presentNextQuiz();
        }
    }

    private async presentNextQuiz(){
        this.currentQuiz = this.defaultQuizPool[this.quizIndex];
        this.correctAnswer = this.currentQuiz.Respuesta[this.currentQuiz.rightAnswerIndex];
        this.shuffleArray(this.currentQuiz.Respuesta);
        await this.quizVisual.updateQuizVisual(this.currentQuiz);
    }

    private shuffleArray(array) {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }
}

