
import { _decorator, Component, Node, } from 'cc';
import { ClockVisual } from '../ClockVisual';
import { WebRequestHandler } from '../WebRequestHandler';
const { ccclass, property } = _decorator;

@ccclass('ClockPresenter')
export class ClockPresenter extends Component {
        @property({type: ClockVisual})
        clockVisual: ClockVisual = null;

        webRequestHandler: WebRequestHandler;
    
        // API is dead, request will fail, but code is here for demonstration purposes
        private apiUrl: string = "http://worldtimeapi.org/api/timezone/Europe/Madrid";
        private currentTime: Date = new Date();
        private timeAccumulated: number = 0;
        
        async onLoad(){
            this.webRequestHandler = new WebRequestHandler();
            // Test API request
            let webInfo = this.webRequestHandler.sendWebRequest("https://dogapi.dog/api/v2/facts?limit=1").then( _ => console.log(webInfo));
    
            // Fake clock created with a specific date, for demonstration purposes (specific date should be fetched from wedbsite, but API is dead)
            this.currentTime = new Date("09/03/2026 10:00:00");
            this.updateClockTime(0);
        }
    
        update(deltaTime: number){

            if(this.timeAccumulated >= 1){
                this.timeAccumulated = 0;
                this.updateClockTime(1);
            }
            else{
                this.timeAccumulated += deltaTime;
            }
        }

        updateClockTime(value: number){
            // Update simulated clock every second
            let currentSeconds = this.currentTime.getSeconds();
            this.currentTime.setSeconds(currentSeconds + value);
            let clockString = this.convertDateToString(this.currentTime);
            this.clockVisual.updateClock(clockString);
        }
    
        convertDateToString(date : Date): string{
            let hours = date.getHours().toString();
            let minutes = date.getMinutes().toString();
            let seconds = date.getSeconds().toString();
    
            let clockString = hours + ":" + minutes + ":" + seconds;
            console.log(clockString);
    
            return clockString;
        }
}

