import {RXComponent} from "../basic/rxcomponent"

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

export class Drawer extends RXComponent{
  constructor(){
    super()
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
    this.options.body.innerHTML= `<div style="padding:20px;">No element is selected</div>`
  }

  render(parentElement){
    super.render(parentElement)
    this.layout.header.domOn('onclick', ()=>{
      this.onTabHeaderClick('layout')
    })
    this.options.header.domOn('onclick', ()=>{
      this.onTabHeaderClick('options')
    })
    return this
  }

  activeTab(tabId){
    this.layout.active(false)
    this.options.active(false)
    this[tabId].active()
  }

}

export class Toolbox extends RXComponent{
  constructor(){
    super()
    this.assembleToolboxItem = (toolboxInfo)=>{
      let rxModuleNameId = toolboxInfo.rxModuleNameId
      if(!this[rxModuleNameId]){
        this[rxModuleNameId] = new ToolboxGroup(toolboxInfo.moduleName).render(this.$dom)
      }

      let toolboxItem = this[rxModuleNameId].add(toolboxInfo)

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
  constructor(title){
    super()
    //this.rxEditorShell = rxEditorShell
    this.title = new RXComponent()
    this.title.cssClass('group-title')
    this.title.innerHTML = '<i class="fa fa-caret-down"></i> ' + title
    this.pushChild(this.title)
    this.groupBody = new RXComponent()
    this.groupBody.cssClass('group-body')
    this.pushChild(this.groupBody)
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
    /* let mousFollowerDom = new RXComponent createChild('element', parentDomElement)
    mousFollowerDom.classList.add('shell-mousefollower')
    mousFollowerDom.style.display = "none"
    mousFollowerDom.innerHTML = this.innerHTML

    this.mousFollower = new MousFollower()
    {
      domElement:mousFollowerDom,
      hiden:()=>{
        this.mousFollower.domElement.style.display = 'none'
      },

      show:()=>{
        this.mousFollower.domElement.style.display = 'block'
      }
    }
   this.domElement = createChild('element', parentDomElement)
    let innerHTML = '<i class="fa fa-arrows"></i> ' + toolboxInfo.elementName
    this.domElement.innerHTML = innerHTML

    this.domElement.onmousedown= (event)=>{
      this.mousFollower.offsetX = event.offsetX
      this.mousFollower.offsetY = event.offsetY
      rxEditorShell.beginFollowMouse(this.mousFollower)
      this.mousFollower.show()
      rxEditorShell.followMouse(event)

      rxEditorShell.draggingFromToolbox(this.toolboxInfo.rxNameId)
    }*/
  }

}


