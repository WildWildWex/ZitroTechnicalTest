
export interface ILoadingBar {
  
  getProgress(): number;
  addProgress(value: number): void;   
   setProgress(value: number): void;    
}
