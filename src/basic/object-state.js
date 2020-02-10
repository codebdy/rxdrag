import {RXArray} from "./rxarray"

export class ObjectState{
  constructor(){
    this.envetHandlers = {}
  }

  watch(attribute, callbackFunction){
    if(!this.envetHandlers[attribute]){
      this.envetHandlers[attribute] = new RXArray
    }
    if(!this.envetHandlers[attribute].contains(callbackFunction)){
      this.envetHandlers[attribute].push(callbackFunction)
    }
  }

  cancelWatch(attribute, callbackFunction){
    console.assert(this.envetHandlers[attribute], 'EditorState: did not register this event handler')
    this.envetHandlers[attribute].remove(callbackFunction)
  }

  distributeEvent(attribute){
    let handlers = this.envetHandlers[attribute];
    if(handlers){
      handlers.forEach((handler)=>{
        handler(this)
      })
    }
  }

}