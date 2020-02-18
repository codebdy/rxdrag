import {Canvas} from "./canvas"
import {CanvasState} from "./canvas-state"
import {RXArray} from "../basic/rxarray"
import {NodeLabel} from "./node-label"
import {NodeToolbar} from "./node-toolbar"

export class RXEditor{
  constructor() {
    this.state = new CanvasState
    this.optionClasses = new RXArray
    this.optionClasses.add('show-outline')
    //this.optionClasses.add('show-label')
    this.activedLabel = new NodeLabel
    this.focusedLabel = new NodeLabel
    this.focusedLabel.cssClass('focused')
    this.focusedLabel.domOn('mousedown', (event)=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.begindragLabel()
      }
    })

    this.toolbar = new NodeToolbar
  }

  hangOn(id, commandProxy){
    this.workspace = document.getElementById(id)
    this.activedLabel.render(this.workspace)
    this.focusedLabel.render(this.workspace)
    this.toolbar.render(this.workspace)
    this.canvas = new Canvas(this.workspace)
    this.canvas.render();
    commandProxy.serveForRXEditor = this
    this.commandProxy = commandProxy

    this.commandProxy.rxeditorReady()
    document.addEventListener('mouseup', (event)=>{
      this.dropElement()
      console.log('canvas mouse up')
    })

    this.state.watch('changed', (state)=>{
      this.optionClasses.tongleOnCondition(state.showOutline, 'show-outline')
      this.optionClasses.tongleOnCondition(!state.showLabel, 'hide-label')
      this.render()
    })
  }

  render(){
    this.canvas.render()
  }

  refresh(){
    this.canvas.refresh()
  }

  clearDraggedoverStates(){
    this.canvas.clearDraggedoverStates()
  }
  clearActiveStates(){
    this.canvas.clearActiveStates()
  }
  clearFocusStates(){
    this.canvas.clearFocusStates()
  }

  dragFromToolbox(rxNameId){
    if(this.draggedNode) return
    let element = this.getElementByRxNameId(rxNameId)
    this.draggedNode = element.make()
    this.beginFollowMouse()
    this.clearFocusStates()
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
    return element
  }

  dropElement(){
    this.endFollowMouse()
    if(this.draggedNode){
      this.clearActiveStates()
      this.draggedNode.changeToState('focusState')
      if(this.draggedNode.parent){
        this.draggedNode.parent.changeToState('normalState')
      }
      this.draggedNode = ''
    }
  }

  endDragFromToolbox(){
    if(this.draggedNode){
      this.draggedNode.changeToState('normalState')
    }
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

  nodeStateChanged(node, oldState, newState){
    if(newState === node.focusState && node.focusState !== node.normalState){
      this.commandProxy.focusNode(node)
    }
    if(oldState === node.focusState && newState !== node.focusState){
      this.commandProxy.unFocusNode(node)
    }
  }

  changeCanvasState(state){
    this.state.screenWidth = state.screenWidth
    this.state.preview = state.preview
    this.state.showEditMargin = state.showEditMargin
    this.state.showOutline = state.showOutline
    this.state.showLabel = state.showLabel
  }

  nodeChanged(node){
    //console.log(node)
    this.canvas.nodeChanged(node)
    this.render()
  }
}
