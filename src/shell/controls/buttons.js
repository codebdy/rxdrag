import {RXComponent} from "../../basic/rxcomponent"
import {ObjectState} from "../../basic/object-state"
import {OpInput} from "./input"

export class RXButton extends RXComponent{
  constructor(){
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
  constructor(innerHTML, id=''){
    super()
    this.id = id
    this.cssClass('op-button')
    this.innerHTML = innerHTML
  }
}

export class OpIconButton extends RXButton{
  constructor(innerHTML){
    super()
    this.cssClass('op-icon-button')
    this.innerHTML = innerHTML
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

export class ButtonGroup extends OpInput{
  constructor(value, schema){
    super(value, schema.defaultValue)
    this.state = new ButtonGroupState
    this.cssClass('button-group')
    for(var id in schema.buttons ){
      this.pushChild(new OpButton(schema.buttons[id], id))
    }
    this.state.actived = value
    this.updateState()
    this.state.watch('actived',(state)=>{
      this.updateState()
      this.onValueChanged(state.actived)
    })
  }

  updateState(){
    this.children.forEach((child)=>{
      child.active(false)
      if(child.id === this.state.actived){
        child.active()
      }
    })

  }

  pushChild(child){
    this[child.id] = child

    child.domOn('click', ()=>{
      this.state.actived = child.id
    })

    return super.pushChild(child)
  }

  active(btnId){
    this[btnId].active()
    return this
  }
}
