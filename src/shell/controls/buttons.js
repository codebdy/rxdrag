import {RXComponent} from "../../basic/rxcomponent"
import {ObjectState} from "../../basic/object-state"

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

    this.state.watch('actived',(state)=>{
      this.children.forEach((child)=>{
        child.active(false)
        if(child.id === state.actived){
          child.active()
        }
      })

      if(this.valueChanged){
        this.valueChanged(state.actived)
      }
    })
  }

  pushChild(child){
    this[child.id] = child

    child.domOn('onclick', ()=>{
      this.state.actived = child.id
    })

    return super.pushChild(child)
  }

  active(btnId){
    this[btnId].active()
    return this
  }
}
