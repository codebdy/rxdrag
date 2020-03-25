import {Canvas} from "./canvas"
import {CanvasState} from "./canvas-state"
import {add, tongleOnCondition} from "../basic/rxarray"
import {CommadManager} from "./commands"
import {NodeLabel} from "./node-label"
import {NodeToolbar} from "./node-toolbar"
import {RxCursor} from "./rx-cursor"
import {MiniEditbar} from "./mini-editbar"
import {RXEditorCommandProxy} from "./rxeditor-command-proxy"

import {NodeParser} from "./node-parser"

export class RXEditor{
  constructor(pageId) {
    this.pageId = pageId
    this.state = new CanvasState
    this.commandManager = new CommadManager
    this.commandManager.onCommandsChanged = (canUndo, canRedo, commandSchema)=>{
      if(!commandSchema) return
      if(commandSchema.parentId === this.canvas.id){
        commandSchema.parentId = ''
      }
      if(commandSchema.oldParentId === this.canvas.id){
        commandSchema.oldParentId = ''
      }
      this.commandProxy.commandExcuted(canUndo, canRedo, commandSchema)
    }
    this.optionClasses = []
    add('show-outline', this.optionClasses)
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
    this.cursor = new RxCursor
    this.miniEditbar = new MiniEditbar
    this.nodeParser = new NodeParser
  }

  hangOn(id){
    let commandProxy = new RXEditorCommandProxy(this.pageId)
    this.workspace = document.getElementById(id)
    this.activedLabel.render(this.workspace)
    this.focusedLabel.render(this.workspace)
    this.toolbar.render(this.workspace)
    this.cursor.render(this.workspace)
    this.miniEditbar.render(this.workspace)
    this.canvas = new Canvas(this.workspace)
    //this.canvas.children = this.load()
    this.canvas.render();
    commandProxy.serveForRXEditor = this
    this.commandProxy = commandProxy

    this.commandProxy.rxeditorReady()
    document.addEventListener('mouseup', (event)=>{
      this.dropElement(event)
    })

    this.state.watch('changed', (state)=>{
      //this.allToNormalState()
    })
    this.state.watch('showOutline', (state)=>{
      tongleOnCondition(state.showOutline, 'show-outline', this.optionClasses)
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

  dragFromToolbox(item){
    if(this.commandManager.movingCommand || this.state.preview) return
    let draggedNode = this.parseNode(item)
    this.commandManager.startNew(draggedNode)
    this.beginFollowMouse()
    //this.clearFocusStates()
  }

  parseNode(item){
    let responsive = this.state.screenWidth
    return this.nodeParser.parse(
      item.code.replace('--responsive--', responsive == 'xs' ? '' : '-'+ responsive)
      )[0]
    //return new BSContainer
  }

  dropElement(event){
    this.doDrop(event)
    this.endFollowMouse()
    this.canvas.clearCharNodes()
  }

  doDrop(event){
    let position = this.cursor.position
    let node = this.cursor.node
    if(!node){
      return
    }
    this.canvas.clearFocusStates()
    let command = this.commandManager.movingCommand
    if(command){
      if(position === 'in-left' || position === 'in-top'){
        command.adoptFromToolbox(node)
        command.moveInTop(node)
        command.finish()
      }
      else if(position === 'in-right' || position === 'in-bottom'){
        command.adoptFromToolbox(node)
        command.moveIn(node)
        command.finish()
      }
      else if(position === 'out-left' 
        || position === 'out-top'
        || position === 'char-left'){
        command.adoptFromToolbox(node)
        command.moveBefore(node)
        command.finish()
      }
      else if(position === 'out-right' 
        || position === 'out-bottom' 
        || position === 'char-right' ){
        command.adoptFromToolbox(node)
        console.log('moveAfter')
        command.moveAfter(node)
        command.finish()
      }
    }
    this.commandManager.finishMoving()
    //rxEditor.dropElement()
  }

  endDragFromToolbox(){
    this.commandManager.finishMoving()
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
    this.cursor.hide()
    this.mouseFollower = ''
  }

  nodeStateChanged(node, oldState, newState){
    if(newState === node.focusState && node.focusState !== node.normalState){
      this.commandProxy.focusNode(node, this.pageId)
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
    this.commandManager.clear()
    this.activedLabel.hide()
    this.focusedLabel.hide()
    this.toolbar.hide()
    this.render()
  }


  focusNodeFromShell(node){
    this.canvas.focusNode(node)
  }

}
