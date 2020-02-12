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


class ButtonGroupState extends ObjectState{
  constructor(){
    super()
    this.__activeDrawerTab = 'options'
  }

  get activeDrawerTab(){
    return this.__activeDrawerTab
  }

  set activeDrawerTab(activeDrawerTab){
    if(this.__activeDrawerTab == activeDrawerTab){return} 
    this.__activeDrawerTab = activeDrawerTab
    this.distributeEvent('activeDrawerTab')
  }
}

export class ButtonGroup extends RXComponent{
  constructor(){
    super()
    this.state = new ButtonGroupState
    this.cssClass('button-group')
   }
}
