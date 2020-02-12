import {RXComponent} from "../../basic/rxcomponent"
import {ObjectState} from "../../basic/object-state"

export class RXButton extends RXComponent{
  constructor(icon){
    super()
  }

  active(isActive= true){
    if(isActive){
      this.$dom ? this.$dom.classList.add('active') : this.classList.add('active')
    }
    else{
      this.$dom ? this.$dom.classList.remove('active') : this.classList.remove('active')
    }
    return this
  }

  title(title){
    this.attrs.title = title
    return this
  }

  enable(isEnable){
    if(!isEnable){
      this.$dom ? this.$dom.classList.add('disable') : this.classList.add('disable')
    }
    else{
      this.$dom ? this.$dom.classList.remove('disable') : this.classList.remove('disable')
    }
  }
}

export class OpButton extends RXButton{
  constructor(){
    super()
  }
}

class ButtonGroupState extends ObjectState{
  constructor(){
    super()
    this.__actived = ''//acitved button id
  }

  get actived(){
    return this.__actived
  }

  set actived(actived){
    if(this.__actived == actived){return} 
    this.__actived = actived
    this.distributeEvent('actived')
  }
}

export class ButtonGroup extends RXComponent{
  constructor(){
    super()
    this.state = new ButtonGroupState
    this.cssClass('button-group')
   }
}
