import {Canvas} from "./canvas"
import {CanvasState} from "./canvas-state"
import {RXArray} from "../basic/rxarray"
import {CommadManager} from "./commands"
import {NodeLabel} from "./node-label"
import {NodeToolbar} from "./node-toolbar"
import {MiniEditbar} from "./mini-editbar"

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
      this.allToNormalState()
    })
    this.state.watch('showOutline', (state)=>{
      this.optionClasses.tongleOnCondition(state.showOutline, 'show-outline')
      this.render()
    })
    this.state.watch('showEditMargin', (state)=>{
      this.allToNormalState()
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
    let draggedNode = element.make()
    this.commandManager.startNew(draggedNode)
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
    this.render()
  }

  load(){
    let data = `[{"name":"HTMLDiv","meta":{"tag":"div","utilColor":{"textColor":"text-white","backgroundColor":"bg-success"},"utilBorder":{"borderColor":"","addBorder":[],"removeBorder":[],"borderRadius":""},"utilMargin":{"all":{"xs":"","sm":"","md":"","lg":"","xl":""},"horizontal":{"xs":"","sm":"","md":"","lg":"","xl":""},"vertical":{"xs":"","sm":"","md":"","lg":"","xl":""},"top":{"xs":"","sm":"","md":"","lg":"","xl":""},"right":{"xs":"","sm":"","md":"","lg":"","xl":""},"bottom":{"xs":"","sm":"","md":"","lg":"","xl":""},"left":{"xs":"","sm":"","md":"","lg":"","xl":""}},"utilPadding":{"all":{"xs":"","sm":"","md":"","lg":"","xl":""},"horizontal":{"xs":"","sm":"","md":"","lg":"","xl":""},"vertical":{"xs":"","sm":"","md":"","lg":"","xl":""},"top":{"xs":"","sm":"","md":"","lg":"","xl":""},"right":{"xs":"","sm":"","md":"","lg":"","xl":""},"bottom":{"xs":"","sm":"","md":"","lg":"","xl":""},"left":{"xs":"","sm":"","md":"","lg":"","xl":""}},"utilClearfix":"","utilDisplay":{"xs":"","sm":"","md":"","lg":"","xl":""},"utilEmbed":{"responsive":"","aspectRadion":""},"utilResponsiveItem":"","utilFlex":{"display":{"xs":"","sm":"","md":"","lg":"","xl":""},"direction":{"xs":"","sm":"","md":"","lg":"","xl":""},"justifyContent":{"xs":"","sm":"","md":"","lg":"","xl":""},"alignItems":{"xs":"","sm":"","md":"","lg":"","xl":""},"alignSelf":{"xs":"","sm":"","md":"","lg":"","xl":""},"fill":{"xs":"","sm":"","md":"","lg":"","xl":""},"grow":{"xs":"","sm":"","md":"","lg":"","xl":""},"shrink":{"xs":"","sm":"","md":"","lg":"","xl":""},"marginAuto":{"xs":"","sm":"","md":"","lg":"","xl":""},"wrap":{"xs":"","sm":"","md":"","lg":"","xl":""},"order":{"xs":"","sm":"","md":"","lg":"","xl":""},"alignContent":{"xs":"","sm":"","md":"","lg":"","xl":""}},"utilFloat":{"xs":"","sm":"","md":"","lg":"","xl":""},"utilTextHide":"","utilOverflow":"","utilPosition":"","utilScreenReaders":"","utilShadow":"","utilSizing":{"width":"","height":""},"utilStretchedLink":"","utilText":{"justify":"","align":{"xs":"","sm":"","md":"text-md-center","lg":"","xl":""},"wrapping":"","truncate":"","wordBreak":"","transform":"","weight":"","italics":"","monospace":"","resetColor":"","decoration":""},"utilVerticalAlignment":"","utilVisibility":""},"children":[{"name":"BSHeading","meta":{"tag":"h2","innerHTML":"欢迎使用RXEditor","headingDisplay":""},"children":[]}]},{"name":"BSContainer","meta":{"tag":"div","containerFluid":"container","utilColor":{"textColor":"","backgroundColor":""},"utilBorder":{"borderColor":"","addBorder":[],"removeBorder":[],"borderRadius":""}},"children":[{"name":"BSRow","meta":{"tag":"div","baseClass":"row","rowGutters":"","rowJustifyContent":{"xs":"","sm":"","md":"","lg":"","xl":""},"utilAlignItems":{"xs":"","sm":"","md":"","lg":"","xl":""}},"children":[{"name":"BSCol","meta":{"tag":"div","colWidth":{"xs":"","sm":"","md":"col-md","lg":"","xl":""},"colOffset":{"xs":"","sm":"","md":"","lg":"","xl":""},"colAlignSelf":{"xs":"","sm":"","md":"","lg":"","xl":""},"colOrder":{"xs":"","sm":"","md":"","lg":"","xl":""},"utilMarginAuto":{"xs":"","sm":"","md":"","lg":"","xl":""}},"children":[{"name":"BSParagraph","meta":{"tag":"p","innerHTML":"Column1","headingPseudo":"","headingDisplay":""},"children":[]}]},{"name":"BSCol","meta":{"tag":"div","colWidth":{"xs":"","sm":"","md":"col-md","lg":"","xl":""},"colOffset":{"xs":"","sm":"","md":"","lg":"","xl":""},"colAlignSelf":{"xs":"","sm":"","md":"","lg":"","xl":""},"colOrder":{"xs":"","sm":"","md":"","lg":"","xl":""},"utilMarginAuto":{"xs":"","sm":"","md":"","lg":"","xl":""}},"children":[{"name":"BSParagraph","meta":{"tag":"p","innerHTML":"Column2","headingPseudo":"","headingDisplay":""},"children":[]}]}]}]}]`
    let dataJson = JSON.parse(data)
    let nodes = this.loadNodes(dataJson, this.canvas)
    return nodes
  }

  loadNodes(dataArray, parent){
    let nodes = new RXArray
    dataArray.forEach((child)=>{
      let node = this.createElement(child.name)
      if(node){
        node.$meta = child.meta
        node.parent = parent
        nodes.push(node)
        node.children = this.loadNodes(child.children, node)
      }
    })

    return nodes
  }

  createElement(className){
    for(var moduleName in this.elements){
      for(var nodeName in this.elements[moduleName]){
        let node = this.elements[moduleName][nodeName]
        if(node.className === className){
          return node.make()
        }
      }
    }
  }
}
