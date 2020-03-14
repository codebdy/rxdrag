import {NodeView} from "./node-view"
import {add, remove, first, last, insertBefore,insertAfter, contains, after, before} from "../basic/rxarray"
import {NormalState, ActiveState, FocusState, DragoverState, DisableState, DraggedState} from "./node-state"

function insterAfterDom(newElement,targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }
  else{
    parent.insertBefore(newElement,targetElement.nextSibling);
  }              
}

export class Node{
  constructor() {
    this.seedId()
    this.toolboxInfo = {mouseFollowerWidth : '200px'}
  	this.children = []
  	this.view = new NodeView()
    this.dropMargin = 30;
    //this.mouseFollowerWidth = '200px'

    //基础数据，持久化也是这部分数据
    this.meta = {
      tag : 'div',
      classList : [],
      styles : {},
      attributes : {},
    }
    
    //Schema 信息，用于构建Option编辑部件
    this.schema = {
      fields:[],
      overView:[],
      groups:[],
    } 

    //空表示所有都接受，空数组表示都不接受
    this.acceptedChildren = []

    //空和空数组都表示所有都不排除
    this.rejectChildren = ''

    this.editMarginStyle = {
      padding:'30px',
    }

    this.config = []

    this.initStates()

    this.mouseFollower = {
      offsetX:10,
      offsetY:0
    }

    this.begindrag = (event)=>{
      event.stopPropagation()
      this.state.onBegindrag(event)
    }

    this.begindragLabel = (event)=>{
      if(this.view.$dom){
        this.mouseFollower.offsetX = event.offsetX
        this.mouseFollower.offsetY = -18 + event.offsetY
      }
      this.begindrag(event)
    }

    this.begindragIcon = (event)=>{
      if(this.view.$dom){
        this.mouseFollower.offsetX = this.view.$dom.clientWidth - 96 + event.offsetX
        this.mouseFollower.offsetY = -24 + event.offsetY
      }
      this.begindrag(event)
    }

    this.mousemove = (event)=>{
      //console.log(event)
      event.stopPropagation()
      this.state.onMousemove(event)
    }
    this.mouseover = (event)=>{
      //console.log(event)
      event.stopPropagation()
      this.state.onMouseover(event)
    }
    this.mouseout = (event)=>{
      //console.log(event)
      event.stopPropagation()
      this.state.onMouseout(event)
    }

    this.onclick = (event)=>{
      event.stopPropagation()
      this.state.onClick(event)
    }

    this.duplicate = ()=>{
      this.changeToState('normalState')
      rxEditor.commandManager.duplicate(this)
      rxEditor.render()
    }

    this.up = (event)=>{
      if(this.parent){
        this.changeToState('normalState')
        this.parent.changeToState('focusState')
        event.stopPropagation()
      }
    }

    this.delete =()=>{
      //if(confirm("Are you sure to delete?")){
        this.changeToState('normalState')
        rxEditor.commandManager.deleteNode(this)
        rxEditor.render()
      //}
    }

    this.stateChanged = (oldState, newState)=>{
      oldState.leave()
      newState.enter()
      rxEditor.nodeStateChanged(this, oldState, newState)
    }

  }

  isTextfield() {
    return false
  }

  seedId(){
    if(!Node.idSeed) Node.idSeed = 1
    Node.idSeed ++
    this.id = Node.idSeed
  }

  initStates(){
    this.normalState = new NormalState(this)
    this.activeState = new ActiveState(this)
    this.focusState = new FocusState(this)
    this.dragoverState = new DragoverState(this)
    this.draggedState = new DraggedState(this)
    this.disableState = new DisableState(this)
    this.state = this.normalState
  }

  changeToState(stateName){
    if(this.state === this[stateName]) return
    let oldState = this.state
    this.state = this[stateName]
    this.refreshState()
    this.stateChanged(oldState, this[stateName])
  }

  render(){
    this.view.render(this.toViewModel(), this.getParentViewDomElement())
    this.children.forEach(function(child){  
      child.render()
    })
  }

  preview(parentDomElement){
    let dom = this.view.preview(this.toPreviewModel(), parentDomElement)
    this.children.forEach((child)=>{  
      child.preview(dom)
    })

    return dom
  }

  refreshState(){
    this.view.refreshState(this.toViewModel())
    this.children.forEach(function(child){  
      child.refreshState()
    })
  }

  createMouseFollower(){
    let followerElement = document.createElement('div')
    followerElement.classList.add('mouse-follow')
    if(!this.parent){
      followerElement.style.width = this.toolboxInfo.mouseFollowerWidth
    }
    this.renderMouseFollower(followerElement)

    this.mouseFollower.$dom = followerElement
    return this.mouseFollower
  }

  renderMouseFollower(parentDomElement){
    let mouseFollower = this.view.renderMouseFollower(this.toViewModel(), parentDomElement)
    this.children.forEach(function(child){  
      child.renderMouseFollower(mouseFollower)
    })

    return mouseFollower
  }

  clearDraggedoverStates(){
    if(this.state === this.dragoverState){
      this.changeToState('normalState')
    }
    this.children.forEach(function(child){  
      child.clearDraggedoverStates()
    })
  }

  clearActiveStates(){
    if(this.state === this.activeState){
      this.changeToState('normalState')
    }
    this.children.forEach(function(child){  
      child.clearActiveStates()
    })
  }

  clearFocusStates(){
    if(this.state === this.focusState){
      this.changeToState('normalState')
    }
    this.children.forEach(function(child){  
      child.clearFocusStates()
    })
  }

  allToNormalState(){
    this.changeToState('normalState')
    this.children.forEach((child)=>{  
      child.allToNormalState()
    })
  }

  getParentViewDomElement(){
    return this.parent.view.$dom
  }

  createChild(nodeName){
    let child = Node.createNode(this, nodeName)
    add(child, this.children) 
    return child
  }

  firstChild(){
    return first(this.children)
  }

  nextSbiling(){
    if(this.parent){
      return after(this, this.parent.children) 
    }
  }

  moveInTop(targetParent){
    if(first(targetParent.children) !== this){
      this.removeFromParent()
      targetParent.unshiftChild(this)
      if(targetParent.view && targetParent.view.$dom){
        targetParent.view.$dom.prepend(this.view.$dom)
      }
    }
  }

  moveIn(targetParent){
    if(last(targetParent.children) !== this){
      this.removeFromParent()
      targetParent.pushChild(this)
      if(this.view.$dom){
        targetParent.view.$dom.appendChild(this.view.$dom)
      }
    }
  }

  moveBefore(brother){
    if(before(brother, this.children) !== this){
      this.removeFromParent()
      this.parent = brother.parent
      insertBefore(this, brother, brother.parent.children);
      if(brother.parent.view && brother.parent.view.$dom
        && brother.view && brother.view.$dom
        && this.view && this.view.$dom)
        brother.parent.view.$dom.insertBefore(this.view.$dom, brother.view.$dom)
    }
  }

  moveAfter(brother){
    if(after(brother, this.children) !== this){
      this.removeFromParent()
      this.parent = brother.parent
      insertAfter(this, brother, brother.parent.children);
      if(brother.view && brother.view.$dom 
        && this.view && this.view.$dom) {
        insterAfterDom(this.view.$dom, brother.view.$dom)
      }
    }
  }

  removeFromParent(){
    if(this.parent){
      //this.view.putDown()
      remove(this, this.parent.children)
      if(this.parent.view && this.parent.view.$dom
        && this.view && this.view.dom){
        parent.view.$dom.removeChild(this.view.dom)
      }
    }
  }

  unshiftChild(child){
    child.parent = this
    this.children.unshift(child) 
    return this
  }

  pushChild(child){
    child.parent = this
    add(child, this.children) 
    return this
  }

  insertAfterSelf(brother){
    brother.parent = this.parent
    insertAfter(brother, this, this.parent.children);
    return this
  }

  clone(){
    let copy = this.make()
    copy.toolboxInfo = JSON.parse(JSON.stringify(this.toolboxInfo))
    this.children.forEach((child)=>{  
      copy.pushChild(child.clone())
    })
    return copy
  }

  canAccept(child){
    if(this.isTextfield()){
      return false
    }

    if(this.acceptedChildren  && this.acceptedChildren.length == 0){
      return false
    }

    if(this.acceptedChildren && !this.containsInAccepted(child)){
      return false
    }

    if(!this.acceptedChildren && this.containsInExcept(child)){
      return false
    }
    return true
  }


  containsInAccepted(child){
    let childName = child.className
    for(var i = 0; i < this.acceptedChildren.length; i++){
      if(this.acceptedChildren[i] === childName){
        return true
      }
    }

    return false
  }

  containsInExcept(child){
    let childName = child.className
    if(this.rejectChildren){
      for(var i = 0; i < this.rejectChildren.length; i++){
        if(this.rejectChildren[i] === childName){
          return true
        }
      }
    }

    return false    
  }

  toViewModel(){
    let classList = []
    add('element', classList);
    classList.push.apply(classList, rxEditor.optionClasses)
    //classList.push.apply(classList, this.meta.baseClass)
    classList.push.apply(classList, this.state.classList)

    let styles = {}

    //if(rxEditor.state.showEditMargin){
    //  Object.assign(styles, this.editMarginStyle)
    //}
    Object.assign(styles, this.state.styles)

    return {
      //text:'test',
      styles:styles,
      classList:classList,
      attributes:{},
      on:{
        onmousemove:this.mousemove,
        onmouseover:this.mouseover,
        onmouseout:this.mouseout,
        onclick:this.onclick,
      }
    }
  }

  toPreviewModel(){
    return {      
      styles:{},
      classList:new RXArray,
      attributes:{},
    }
  }

  toJson(){
    let json = {
      name: this.className,
      meta: JSON.parse(JSON.stringify(this.meta)),
      children: []
    }

    this.children.forEach((child)=>{
      json.children.push(child.toJson())
    })

    return json
  }

  toTreeViewNode(){
    let view = {
      name: this.className,
      label: this.label,
      tag:this.meta.tag,
      id: this.id,
      state:this.getStateName(),
      children: [],
    }

    this.children.forEach((child)=>{
      view.children.push(child.toTreeViewNode())
    })

    return view
  }

  getStateName(){
    if(this.state === this.normalState){
      return 'normalState'
    }
    if(this.state === this.activeState){
      return 'activeState'
    }
    if(this.state === this.focusState){
      return 'focusState'
    }
    if(this.state === this.dragoverState){
      return 'dragoverState'
    }
    if(this.state === this.draggedState){
      return 'draggedState'
    }
    if(this.state === this.disableState){
      return 'disableState'
    }
  }

  nodeChanged(node){
    if(this.id === node.id){
      rxEditor.commandManager.changeNode(this, node)
      return;
    }

    this.children.forEach((child)=>{
      child.nodeChanged(node)
    })
  }

  focusNode(node){
    if(node.id === this.id){
      this.changeToState('focusState')
    }
    else{
      this.changeToState('normalState')
    }
    this.children.forEach((child)=>{
      child.focusNode(node)
    })
  }

  configSelf(){
    console.log('node configSelf')
  }

  loadConfig(){
    this.configSelf()
    return this
  }

}
