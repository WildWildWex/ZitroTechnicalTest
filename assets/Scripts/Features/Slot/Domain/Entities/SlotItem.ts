
import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SlotItem
 * DateTime = Wed Mar 18 2026 21:35:38 GMT+0100 (hora estándar de Europa central)
 * Author = RafaCR
 * FileBasename = SlotItem.ts
 * FileBasenameNoExtension = SlotItem
 * URL = db://assets/Scripts/Features/Slot/Domain/Entities/SlotItem.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SlotItem')
export class SlotItem extends Component {
   

    @property({type: Sprite})
        slotSprite: Sprite = null;
    
    private value: number = 0;


    setSprite(sprite: SpriteFrame){
        this.slotSprite.spriteFrame = sprite;

    }

    setValue(value: number){
        this.value = value;
    }

    getValue(): number{
        return this.value;
    }
}