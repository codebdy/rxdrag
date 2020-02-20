import {RXComponent} from "../basic/rxcomponent"
import {ObjectState} from "../basic/object-state"
import {ToolGroup,ToolboxState} from "./controls/tool-group"

export class Toolbox extends RXComponent{
  constructor(){
    super()
    this.state = new ToolboxState
    this.cssClass('toolbox')
    this.assembleToolboxItem = (toolboxInfo)=>{
      this.initGroups()
      //let rxModuleNameId = toolboxInfo.groupId
      //if(!this[rxModuleNameId]){
      //  this[rxModuleNameId] = new ToolboxGroup(toolboxInfo.moduleName).render(this.$dom)
      //}

      let toolboxItem = this[toolboxInfo.groupId].add(toolboxInfo)

      toolboxItem.domOn('mousedown',(event)=>{
        this.draggingFromToolbox(toolboxItem.toolboxInfo.rxNameId)
        toolboxItem.mouseFollower.offsetX = event.offsetX
        toolboxItem.mouseFollower.offsetY = event.offsetY
        this.beginFollowMouse(toolboxItem.mouseFollower, event)
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

  initGroups(){
    if(!this['groupLayout']){
      this.groupLayout =  new ToolboxGroup('Layout','groupLayout', this.state)
                            .cssClass('no-title-top-border')
                            .render(this.$dom)
      this.groupLayout.active()
    }

    if(!this['groupContent']){
      this.groupContent =  new ToolboxGroup('Content', 'groupContent', this.state).render(this.$dom)
    }

    if(!this['groupComponents']){
      this.groupComponents =  new ToolboxGroup('Components','groupComponents', this.state).render(this.$dom)
    }

    if(!this['groupTemplates']){
      this.groupTemplates =  new ToolboxGroup('Templates','groupTemplates', this.state).render(this.$dom)
    }
    
    if(!this['groupHtml']){
      this.groupHtml =  new ToolboxGroup('HTML','groupHtml', this.state).render(this.$dom)
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
  }

}
