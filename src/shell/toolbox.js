import {RXComponent} from "../basic/rxcomponent"
import {ObjectState} from "../basic/object-state"
import {ToolGroup,ToolboxState} from "./controls/tool-group"



export class Toolbox extends RXComponent{
  constructor(){
    super()
    this.state = new ToolboxState
    this.cssClass('toolbox')
    this.cssClass('toolbox-scroll')
    this.assembleToolbox = (toolbox)=>{
      this.clear()
      this.initGroups(toolbox.groups)
      //let rxModuleNameId = toolboxInfo.groupId
      //if(!this[rxModuleNameId]){
      //  this[rxModuleNameId] = new ToolboxGroup(toolboxInfo.moduleName).render(this.$dom)
      //}
      toolbox.toolItems.forEach((toolboxInfo)=>{
        let toolItem = this[toolboxInfo.groupId].add(toolboxInfo)

        toolItem.onDrag= (toolboxItem, event)=>{
          this.draggingFromToolbox(toolboxItem.toolboxInfo.rxNameId)
          toolboxItem.mouseFollower.offsetX = event.offsetX
          toolboxItem.mouseFollower.offsetY = event.offsetY
          this.beginFollowMouse(toolboxItem.mouseFollower, event)
        }
      })
    }

    document.addEventListener('mousemove', (event)=>{
      this.followMouse(event)
    })
    document.addEventListener('mouseup', (event)=>{
      this.endFollowMouse()
      this.endDragFromToolbox()
    })


  }

  initGroups(groups){
    //console.log(groups)
    for(var groupName in groups){
      let group = groups[groupName]
      let groupCtrl = new ToolboxGroup(group.label, groupName, this.state).render(this.$dom)
      this[groupName] = groupCtrl
      this.pushChild(groupCtrl)
    }
    
    if(this.children.length > 0){
      this.children.first()
        .cssClass('no-title-top-border')
        .active()
    }

  }


  followMouse(event){
    let mouseFollower = this.mouseFollower
    if(mouseFollower){
      mouseFollower.$dom.style.left =  this.followX(event)
      mouseFollower.$dom.style.top = this.followY(event)
    }
  }

  followX(event){
    return (event.clientX - this.mouseFollower.offsetX - 4) + 'px'
  }

  followY(event){
    return (event.clientY - this.mouseFollower.offsetY - 3) + 'px'
  }

  beginFollowMouse(mouseFollower,event){
    mouseFollower.show()
    this.mouseFollower = mouseFollower
    this.followMouse(event)
  }

  endFollowMouse(){
    if(this.mouseFollower){
      this.mouseFollower.hiden()
    }

    this.mouseFollower = ''
  }

  clear(){
    this.children.clear()
    this.setInnerHTML('')
  }


}


export class ToolboxGroup extends ToolGroup{
  constructor(title, id, groupsState){
    super(title, id, groupsState)
  }

  add(toolboxInfo){
    let toolboxItem = new ToolboxItem(toolboxInfo).render(this.groupBody.$dom)
    this.groupBody.pushChild(toolboxItem)
    return toolboxItem
  }
}

class MouseFollower extends RXComponent{
  constructor(){
    super()
    this.cssClass('shell-mousefollower')
    this.cssStyle('display', 'none')
    this.show = ()=>{
      this.$dom.style.display = 'block'
    }
    this.hiden = ()=>{
      this.$dom.style.display = 'none'
    }
  }

}

class ToolboxItem extends RXComponent{
  constructor(toolboxInfo){
    super()
    this.toolboxInfo = toolboxInfo
    this.cssClass('element')
    this.innerHTML = '<i class="fa fa-arrows"></i> ' + toolboxInfo.elementName
    this.mouseFollower = new MouseFollower
    this.mouseFollower.cssClass('element')
    this.mouseFollower.innerHTML = this.innerHTML
    this.pushChild(this.mouseFollower)

    this.onDrag = (toolboxInfo, event)

    this.domOn('mousedown',(event)=>{
      this.onDrag(this, event)
    })
  }

}
