
import { _decorator, CCString, Color, Component, Label, Node, Sprite, tween, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;
import {Quiz} from '../Quiz';
import { eventHandler } from './EventHandler';

@ccclass('QuizVisual')
export class QuizVisual extends Component {
   
    @property({type: Label})
    questionLabel: Label = null;

    @property({type: [Label]})
    answersLabels: Label[] = [];

    @property({type: Color})
    wrongAnswerColor: Color = null;

    @property({type: Color})
    rightAnswerColor: Color = null;

    @property({type: Color})
    defaultColor: Color = null;

    @property({type: UIOpacity})
    answersLayoutOpacity: UIOpacity;
     @property({type: CCString})
    gameOverTxt: string = "CONGRATULATIONS!";
    

    private currentQuiz: Quiz = null;
    private fadeInDuration: number = 1.2;
    private fadeOutDuration: number = 0.6;
    private questionLabelOpacity: UIOpacity;
       

    onLoad(){
        // Set Q and A alpha to 0
        this.questionLabelOpacity = this.questionLabel.getComponent(UIOpacity);
        this.questionLabelOpacity.opacity = 0;
        this.answersLayoutOpacity.opacity = 0;
    }

    async updateQuizVisual(nextQuiz: Quiz){
        this.currentQuiz = nextQuiz;
        await this.updateQuizQuestion();
        console.log(nextQuiz);

        for(let i = 0; i < nextQuiz.Respuesta.length; i++){
            this.answersLabels[i].string = nextQuiz.Respuesta[i]
        }
        await this.updateQuizAnswers();
    }
    
    private async updateQuizQuestion(){
        this.questionLabel.string = this.currentQuiz.Pregunta;
        // Wait for animation
        await new Promise<void>((resolve) => {
            tween(this.questionLabelOpacity)
                .to(this.fadeInDuration, { opacity: 255 }, { easing: 'fade' })
                .call(() => resolve())
                .start();
        });
    }

    private async updateQuizAnswers(){
        await new Promise<void>((resolve) => {
            tween(this.answersLayoutOpacity)
                .to(this.fadeInDuration, { opacity: 255 }, { easing: 'fade' })
                .call(() => resolve())
                .start();
        });
    }

    private async fadeOutAnimations(){
        await new Promise<void>((resolve) => {
            tween(this.questionLabelOpacity)
                .to(this.fadeOutDuration, { opacity: 0 }, { easing: 'fade' })
                .call(() => resolve())
                .start();
        });

        await new Promise<void>((resolve) => {
            tween(this.answersLayoutOpacity)
                .to(this.fadeOutDuration, { opacity: 0 }, { easing: 'fade' })
                .call(() => resolve())
                .start();
        });
    }

    async wrongAnswerFeedback(){
        this.questionLabel.color = this.wrongAnswerColor;
        // await this.fadeOutDuration;
        // play wrong sound

        await this.fadeOutAnimations();
        this.questionLabel.color = this.defaultColor;
    }

    async rightAnswerFeedback(){
        
        this.questionLabel.color = this.rightAnswerColor;
        // await this.fadeOutDuration;
        // play right sound

        await this.fadeOutAnimations();
        this.questionLabel.color = this.defaultColor;
    }

    async finishGameFeedback(){
        this.questionLabel.string = this.gameOverTxt;
        // Cool SFX
        await 2;
    }

    public onAnswerButtonPressed(event: Event, customEventData){
        let answer = this.answersLabels[customEventData].string;
        console.log(answer);
        eventHandler.emit('onSelectAnswer', answer);
    }
}