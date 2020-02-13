import {RXComponent} from "../../basic/rxcomponent"
import {ObjectState} from "../../basic/object-state"

export class ToolGroup extends RXComponent{
  constructor(title, id, groupsState){
    super()
    this.id = id
    this.state = groupsState
    this.cssClass('tool-group')
    this.cssClass('group-collapse')
    this.title = new RXComponent()
    this.title.cssClass('group-title')
    this.title.innerHTML = title
    this.pushChild(this.title)
    this.groupBody = new RXComponent()
    this.groupBody.cssClass('group-body')
    this.pushChild(this.groupBody)

    this.domOn('onclick',()=>{
      this.state.activedGroup = this.id
    })
    this.state.watch('activedGroup', (state)=>{
      this.active(state.activedGroup === this.id)
    })
  }

  active(isActive = true){
    if(!isActive){
      this.$dom ? this.$dom.classList.add('group-collapse') : this.classList.add('group-collapse')
    }
    else{
      this.$dom ? this.$dom.classList.remove('group-collapse') : this.classList.remove('group-collapse')
    }
    return this
  }
}

export class ToolboxState extends ObjectState{
  constructor(){
    super()
    this.__activedGroup = 'groupContainer'
  }

  get activedGroup(){
    return this.__activedGroup
  }

  set activedGroup(activedGroup){
    if(this.__activedGroup == activedGroup){return} 
    this.__activedGroup = activedGroup
    this.distributeEvent('activedGroup')
  }
}
