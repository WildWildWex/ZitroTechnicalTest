
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RandomGenerator')
export class RandomGenerator {

    generateRandomArray(arrayLength: number): number[]{
        // Generate random array of values with equal chances for everything
        let newArray = Array.from({length: arrayLength}, () => Math.floor(Math.random() * arrayLength));
        // last 3 values = initial 3 values
        for(var i = 0; i < 3; i++){
            let j = 3-i;
            newArray[newArray.length-j] = newArray[i]
        }
        return newArray;
    }

    getRandomNumber(maxValue: number):number{
        // Don't pick the first or last values
        let selected = false;
        let value;

        while(!selected){
            value = Math.floor(Math.random() * maxValue);

            if(value > 0 && value < maxValue-1)
                selected = true;
        }
        return value;
    }
}
