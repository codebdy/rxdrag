import {Canvas} from "./canvas"

export class RXEditor{
  constructor() {
  }

  hangOn(id, commandProxy){
    this.workspace = document.getElementById(id)
    this.canvas = new Canvas(this.workspace)
    this.canvas.render();
    commandProxy.serveForRXEditor = this
    this.commandProxy = commandProxy

    this.commandProxy.rxeditorReady()
    document.onmouseup = (event)=>{
      this.dropToolboxItem()
       console.log('canvas mouse up')
    }

  }

  render(){
    this.canvas.render();
  }

  refresh(){
    this.canvas.refresh();
  }

  clearDraggedoverStates(){
    this.canvas.clearDraggedoverStates()
  }
  clearActiveStates(){
    this.canvas.clearActiveStates()
  }

  dragFromToolbox(rxNameId){
    if(this.draggedNode) return
    let element = this.getElementByRxNameId(rxNameId)
    this.draggedNode = element.make()
    this.beginFollowMouse()
  }

  getElementDefine(rxNameId){
    let element = this.getElementByRxNameId(rxNameId)
    return element.toolboxInfo
  }

  getElementByRxNameId(rxNameId){
    let nameArray = rxNameId.split('.')
    let moduleId = nameArray[0]
    let elementId = nameArray[1]
    let element = this[moduleId][elementId]
    console.assert(element, 'Can not find element:' + rxNameId)
    element.toolboxInfo.rxNameId =rxNameId
    element.toolboxInfo.rxModuleNameId = moduleId
    element.toolboxInfo.rxElementNameId = elementId
    return element
  }

  dropToolboxItem(){
    this.endFollowMouse()
    if(this.draggedNode){
      this.clearActiveStates()
      this.draggedNode.changeToState('activeState')
      if(this.draggedNode.parent){
        this.draggedNode.parent.changeToState('normalState')
      }
      this.draggedNode = ''
    }
  }

  endDragFromToolbox(){
    console.log('canvas endDragFromToolbox')
    this.draggedNode = ''
    this.endFollowMouse()
  }

  followMouse(event){
    let mouseFollower = this.mouseFollower
    if(mouseFollower){
      mouseFollower.domElement.style.left =  this.followX(event)
      mouseFollower.domElement.style.top = this.followY(event)
      this.commandProxy.takeOverDraggingByWorkspace()
    }
  }

  followX(event){
    return (event.clientX - this.mouseFollower.offsetX) + 'px'
  }

  followY(event){
    return (event.clientY - this.mouseFollower.offsetY) + 'px'
  }

  beginFollowMouse(){
    if(this.draggedNode){
      let mouseFollower = this.draggedNode.createMouseFollower(event)
      this.workspace.appendChild(mouseFollower.domElement)
      this.mouseFollower = mouseFollower
      //mouseFollower.domElement.style.left = this.followX(event)
      //mouseFollower.domElement.style.top = this.followY(event)
    }
  }

  endFollowMouse(){
    if(this.mouseFollower && this.workspace.contains(this.mouseFollower.domElement)){
      this.workspace.removeChild(this.mouseFollower.domElement)
    }

    this.mouseFollower = ''
  }

  bindToolboxItem(toolboxItemName, elementId){
    let toolboxItem = new ToolboxItem(toolboxItemName)

    toolboxItem.bindTo(elementId)
  }

}
