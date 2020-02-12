import {RXComponent} from "../basic/rxcomponent"
import {ObjectState} from "../basic/object-state"

class Tab{
  constructor(){
    this.header = new RXComponent().cssClass('item')
    this.body = new RXComponent().cssClass('tab-body')
  }

  pushChild(child){
    this.body.pushChild(child)
  }

  active(isActive = true){
    if(isActive){
      this.header.$dom ? this.header.$dom.classList.add('active') : this.header.classList.add('active')
      this.body.$dom ? this.body.$dom.classList.add('active') : this.body.classList.add('active')
    }
    else{
      this.header.$dom ? this.header.$dom.classList.remove('active') : this.header.classList.remove('active')
      this.body.$dom ? this.body.$dom.classList.remove('active') : this.body.classList.remove('active')
    }
    return this
  }
}

class DrawerState extends ObjectState{
  constructor(){
    super()
    this.__activeDrawerTab = 'layout'
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


export class Drawer extends RXComponent{
  constructor(){
    super()
    this.state = new DrawerState
    this.cssClass('rx-right-area')
    this.layout = new Tab
    this.layout.header.domAttr('title', 'Layout').innerHTML = '<i class="fa fa-th-large"></i>'
    this.options = new Tab
    this.options.header.domAttr('title', 'Options').innerHTML = '<i class="fa fa-paint-brush"></i>'

    this.pushChild(new RXComponent()
                    .cssClass('rx-drawer')
                    .pushChild(new RXComponent()
                      .cssClass('top-header')
                      .pushChild(this.layout.header)
                      .pushChild(this.options.header)
                    )
                    .pushChild(new RXComponent()
                      .cssClass('tab-contents')
                      .pushChild(this.layout.body)
                      .pushChild(this.options.body)
                    )
                  )
    this.toolbox = new Toolbox()
    this.layout.pushChild(this.toolbox)
    //this.options.body.innerHTML= `<div style="padding:20px;">No elements selected</div>`
    this.options.body.innerHTML= `
      <div style="padding:10px; font-size:13px; display:flexed;flex-flow:column;">
        <div>Base Classes</div>
        <div style="background:#424242;margin-top:10px;padding:5px;">
          <div>container</div>
          <div>container</div>
        </div>

      </div>
    `

    this.state.watch('activeDrawerTab', (state)=>{
      this.activeTab(state.activeDrawerTab)
    })
    this.activeTab('layout')
  }

  render(parentElement){
    super.render(parentElement)
    this.layout.header.domOn('onclick', ()=>{
      this.state.activeDrawerTab = 'layout'
    })
    this.options.header.domOn('onclick', ()=>{
      this.state.activeDrawerTab = 'options'
    })
    return this
  }

  activeTab(tabId){
    this.layout.active(false)
    this.options.active(false)
    this[tabId].active()
  }

}

class ToolboxState extends ObjectState{
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

export class Toolbox extends RXComponent{
  constructor(){
    super()
    this.state = new ToolboxState
    this.cssClass('toolbox')
    this.assembleToolboxItem = (toolboxInfo)=>{
      this.inidGroups()
      //let rxModuleNameId = toolboxInfo.groupId
      //if(!this[rxModuleNameId]){
      //  this[rxModuleNameId] = new ToolboxGroup(toolboxInfo.moduleName).render(this.$dom)
      //}

      let toolboxItem = this[toolboxInfo.groupId].add(toolboxInfo)

      toolboxItem.domOn('onmousedown',(event)=>{
        this.draggingFromToolbox(toolboxItem.toolboxInfo.rxNameId)
        toolboxItem.mouseFollower.offsetX = event.offsetX
        toolboxItem.mouseFollower.offsetY = event.offsetY
        this.beginFollowMouse(toolboxItem.mouseFollower, event)
      })
    }

    document.onmousemove = (event)=>{
      this.followMouse(event)
    }
    document.onmouseup = (event)=>{
      console.log('toolbox mouseup')
      this.endFollowMouse()
      this.endDragFromToolbox()
    }


  }

  inidGroups(){
    if(!this['groupContainer']){
      this.groupContainer =  new ToolboxGroup('Container','groupContainer', this.state).render(this.$dom)
      this.groupContainer.active()
    }

    if(!this['groupGrid']){
      this.groupGrid =  new ToolboxGroup('Grid', 'groupGrid', this.state).render(this.$dom)
    }

    if(!this['groupText']){
      this.groupText =  new ToolboxGroup('Text','groupText', this.state).render(this.$dom)
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

export class ToolboxGroup extends RXComponent{
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

  add(toolboxInfo){
    let toolboxItem = new ToolboxItem(toolboxInfo).render(this.groupBody.$dom)
    this.groupBody.pushChild(toolboxItem)
    return toolboxItem
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


