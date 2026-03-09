
import { _decorator, Component, Node, } from 'cc';
import { ClockVisual } from './ClockVisual';
const { ccclass, property } = _decorator;

@ccclass('WebRequestPresenter')
export class WebRequestPresenter extends Component {
    
    @property({type: ClockVisual})
    clockVisual: ClockVisual = null;

    // API is dead, request will fail, but code is here for demonstration purposes
    private apiUrl: string = "http://worldtimeapi.org/api/timezone/Europe/Madrid";
    private currentTime: Date = new Date();
    
    start(){
        // Test API request
        this.sendWebRequest("https://dogapi.dog/api/v2/facts?limit=1");

        // Fake clock created with a specific date, for demonstration purposes (specific date should be fetched from wedbsite, but API is dead)
        this.currentTime = new Date("09/03/2026 10:00:00");
            this.currentTime.setSeconds(30);
    }

    update(deltaTime: number){
        // Update fake clock every second
        this.addSecondsToClock(deltaTime);
        let clockString = this.convertDateToString(this.currentTime);
        this.clockVisual.updateClock(clockString);
    }
    
    sendWebRequest(url: string){
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onload = function() {
            if (req.status >= 200 && req.status < 400) {
                // Success
                let data = JSON.parse(req.responseText);
                console.log("Received data: ", data);
            } else {
                // We reached our target server, but it returned an error
                console.error("Server returned an error: " + req.status);
            }
        };

        req.onerror = function() {
            // There was a connection error of some sort
            console.error("Connection error");
        };

        req.send();

    }

    addSecondsToClock(addedSeconds : number){
        let currentSeconds = this.currentTime.getSeconds();
        this.currentTime.setSeconds(currentSeconds + addedSeconds);
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