import {Canvas} from "./canvas"
import {CanvasState} from "./canvas-state"
import {RXArray} from "../basic/rxarray"
import {CommadManager} from "./commands"
import {NodeLabel} from "./node-label"
import {NodeToolbar} from "./node-toolbar"
import {MiniEditbar} from "./mini-editbar"
import {load, loadOneNode} from "./load"

export class RXEditor{
  constructor() {
    this.state = new CanvasState
    this.commandManager = new CommadManager
    this.commandManager.onCommandsChanged = (canUndo, canRedo)=>{
      this.commandProxy.commandsHistoryChanged(canUndo, canRedo)
    }
    this.optionClasses = new RXArray
    this.optionClasses.add('show-outline')
    //this.optionClasses.add('show-label')
    this.activedLabel = new NodeLabel
    this.focusedLabel = new NodeLabel
    this.focusedLabel.cssClass('focused')
    this.focusedLabel.domOn('mousedown', (event)=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.begindragLabel(event)
      }
    })

    this.toolbar = new NodeToolbar
    this.miniEditbar = new MiniEditbar
  }

  hangOn(id, commandProxy){
    this.workspace = document.getElementById(id)
    this.activedLabel.render(this.workspace)
    this.focusedLabel.render(this.workspace)
    this.toolbar.render(this.workspace)
    this.miniEditbar.render(this.workspace)
    this.canvas = new Canvas(this.workspace)
    //this.canvas.children = this.load()
    this.canvas.render();
    commandProxy.serveForRXEditor = this
    this.commandProxy = commandProxy

    this.commandProxy.rxeditorReady()
    document.addEventListener('mouseup', (event)=>{
      this.dropElement()
    })

    this.state.watch('changed', (state)=>{
      //this.allToNormalState()
    })
    this.state.watch('showOutline', (state)=>{
      this.optionClasses.tongleOnCondition(state.showOutline, 'show-outline')
      this.render()
    })
    this.state.watch('showEditMargin', (state)=>{
      //this.allToNormalState()
      this.render()
    })
    this.state.watch('preview', (state)=>{
      if(state.preview){
        this.preview()
      }
      else {
        this.render()
      }
    })

  }

  render(){
    if(this.previewDom && this.workspace.contains(this.previewDom)){
      this.workspace.removeChild(this.previewDom);
      this.previewDom = ''
    }
    this.canvas.render()
    this.toolbar.refreshPosition()
    this.focusedLabel.refreshPosition()
  }

  preview(){
    this.allToNormalState()
    this.previewDom = this.canvas.preview(this.workspace)
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

  allToNormalState(){
    this.canvas.allToNormalState()
  }

  dragFromToolbox(rxNameId){
    if(this.commandManager.movingCommand || this.state.preview) return
    let element = this.getElementByRxNameId(rxNameId)
    let draggedNode = element.clone()
    this.commandManager.startNew(draggedNode)
    this.beginFollowMouse()
    this.clearFocusStates()
  }

  assembleWithTheme(theme){
    this.loadTheme(theme)
    let toolbox = {
      groups : {},
      toolItems : [],
    }
    let themeGroupId = 'groupThemUI'
    if(theme.uiBlocks){
      toolbox.groups[themeGroupId] = {
        label:'Theme UI',
      }
      if(theme.uiBlocks){
        this.loadThemeToolItems(theme.uiBlocks, themeGroupId)
      }
    }

    toolbox.groups.groupLayout = {
      label:'Layout',
    }

    toolbox.groups.groupContent = {
      label:'Content',
    }

    toolbox.groups.groupComponents = {
      label:'Components',
    }
    toolbox.groups.groupIcons = {
      label:'Icons',
    }

    toolbox.groups.groupHtml = {
      label:'HTML',
    }

    for(var moduleName in this.elements){
      let theModule = this.elements[moduleName]
      for(var elementName in theModule){
        let toolboxInfo = theModule[elementName].toolboxInfo
        toolboxInfo.rxNameId = moduleName + "." + elementName
        toolbox.toolItems.push(toolboxInfo)
      }
    }
    //let element = this.getElementByRxNameId(rxNameId)
    //return element.toolboxInfo
    return {
      toolbox: toolbox,
      treeViewNodes: this.canvas.generateTreeViewNodes()
    }
  }

  loadTheme(theme){
    if(theme.initialPage){
      this.canvas.children = load(theme.initialPage)
      this.render()
    }
  }

  getElementByRxNameId(rxNameId){
    let nameArray = rxNameId.split('.')
    let moduleId = nameArray[0]
    let elementId = nameArray[1]
    let element = this.elements[moduleId][elementId]
    console.assert(element, 'Can not find element:' + rxNameId)
    element.toolboxInfo.rxNameId =rxNameId
    return element
  }

  dropElement(){
    this.endFollowMouse()
    if(this.commandManager.movingCommand){
      let draggedNode = this.commandManager.movingCommand.node
      this.clearActiveStates()
      draggedNode.changeToState('focusState')
      if(draggedNode.parent){
        draggedNode.parent.changeToState('normalState')
      }
      this.commandManager.finishMoving()
    }
  }

  endDragFromToolbox(){
    if(this.commandManager.movingCommand){
      let draggedNode = this.commandManager.movingCommand.node
      this.commandManager.finishMoving()
      draggedNode.changeToState('normalState')
    }
    this.endFollowMouse()
  }

  followMouse(event){
    let mouseFollower = this.mouseFollower
    if(mouseFollower){
      mouseFollower.$dom.style.left =  this.followX(event)
      mouseFollower.$dom.style.top = this.followY(event)
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
    if(this.commandManager.movingCommand){
      let draggedNode = this.commandManager.movingCommand.node
      let mouseFollower = draggedNode.createMouseFollower(event)
      this.workspace.appendChild(mouseFollower.$dom)
      this.mouseFollower = mouseFollower
    }
  }

  endFollowMouse(){
    if(this.mouseFollower && this.workspace.contains(this.mouseFollower.$dom)){
      this.workspace.removeChild(this.mouseFollower.$dom)
    }

    this.mouseFollower = ''
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


  undo(){
    this.allToNormalState()
    this.commandManager.undo()
    this.render()
  }

  redo(){
    this.allToNormalState()
    this.commandManager.redo()
    this.render()
  }

  download(){
    let innerHTML = this.canvas.generateHTML()
    let json = this.canvas.generateJson()
    this.commandProxy.saveCodeFiles(innerHTML, json)
    this.render()
  }

  clearCanvas(){
    this.canvas.children.length = 0
    this.focusedLabel.hide()
    this.toolbar.hide()
    this.render()
  }


  loadThemeToolItems(uiBlocks, groudId){
    this.elements.theme = {}
    uiBlocks.forEach((uiBlock) =>{
      let dataJson = JSON.parse(uiBlock.json)
      let node = loadOneNode(dataJson)
      node.toolboxInfo = JSON.parse(JSON.stringify(uiBlock.toolboxInfo))
      node.toolboxInfo.groupId = groudId
      //node.mouseFollowerWidth = uiBlock.mouseFollowerWidth
      this.elements.theme[node.toolboxInfo.elementId] = node
    })
  }

  focusNodeFromShell(node){
    this.canvas.focusNode(node)
  }

}
