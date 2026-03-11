
import { _decorator, Component, } from 'cc';
const { ccclass } = _decorator;

@ccclass('WebRequestPresenter')
export class WebRequestHandler{
    
    async sendWebRequest(url: string): Promise<string>{
            let req = new XMLHttpRequest();
            await req.open("GET", url, true);
            req.onload = function() {
                if (req.status >= 200 && req.status < 400) {
                    // Success
                    let data = JSON.parse(req.responseText);
                    console.log("Received data: ", data);
                    return data;
                } else {
                    // We reached our target server, but it returned an error
                    console.error("Server returned an error: " + req.status);
                    return req.status;
                }
            };
    
            req.onerror = function() {
                // There was a connection error of some sort
                console.error("Connection error");
            };
    
            req.send();
            return null;
        }
}