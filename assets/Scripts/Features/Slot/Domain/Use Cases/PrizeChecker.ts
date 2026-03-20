
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('PrizeChecker')
export class PrizeChecker {

    // This class could be much more extended with all prize combinations
    checkPrizes(value1, value2, value3: number): boolean{

        if(value1 == value2 && value1 == value3)
            return true;
        else
            return false;
    }
  
}

