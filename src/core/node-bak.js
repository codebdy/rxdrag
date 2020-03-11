//import {NodeView} from "./node-view"
import {RXArray} from "../basic/rxarray"
import {NormalState, ActiveState, FocusState, DragoverState, DisableState, DraggedState} from "./node-state"

function insterAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }
  else{
    parent.insertBefore(newElement,targetElement.nextSibling);
  }              
}

export class Node{
  constructor(dom) {
    this.seedId()
    this.toolboxInfo = {mouseFollowerWidth : '200px'}
  	this.children = new RXArray
  	this.$dom = dom
    this.dropMargin = 30;
    //this.mouseFollowerWidth = '200px'

    //空表示所有都接受，空数组表示都不接受
    this.acceptedChildren = new RXArray

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
      if(this.$dom){
        this.mouseFollower.offsetX = event.offsetX
        this.mouseFollower.offsetY = -18 + event.offsetY
      }
      this.begindrag(event)
    }

    this.begindragIcon = (event)=>{
      if(this.$dom){
        this.mouseFollower.offsetX = this.$dom.clientWidth - 96 + event.offsetX
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

    this.refreshState()
    this.hangToDom()
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

  hangToDom(){
    this.$dom.onmousemove = this.mousemove
    this.$dom.onmouseover = this.mouseover
    this.$dom.onmouseout = this.mouseout
    this.$dom.onclick = this.onclick
  }

  changeToState(stateName){
    if(this.state === this[stateName]) return
    let oldState = this.state
    this.state = this[stateName]
    this.refreshState()
    this.stateChanged(oldState, this[stateName])
  }


  refreshState(){
    if(this.$dom){
      this.$dom.classList.remove(
        this.activeState.cssClass,
        this.focusState.cssClass,
        this.draggedState.cssClass,
        this.dragoverState.cssClass
      )
      if(this.state.cssClass){
        this.$dom.classList.add(this.state.cssClass)
      }
      //@@@@后面要移到别的地方
      this.$dom.classList.add('show-outline')
    }
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
    let mouseFollower = this.$dom.cloneNode(true)
    parentDomElement.appendChild(mouseFollower)
    if(this.$dom){
      mouseFollower.style.width = this.$dom.clientWidth + 'px'
    }
    return mouseFollower
  }

  clearDraggedoverStates(){
    if(this.state === this.dragoverState){
      this.changeToState('normalState')
    }
  }

  clearActiveStates(){
    if(this.state === this.activeState){
      this.changeToState('normalState')
    }
  }

  clearFocusStates(){
    if(this.state === this.focusState){
      this.changeToState('normalState')
    }
  }

  //getParentViewDomElement(){
  //  return this.parent.view.$dom
  //}

  createChild(nodeName){
    let child = Node.createNode(this, nodeName)
    this.children.add(child) 
    return child
  }

  firstChild(){
    return this.children.first()
  }

  nextSbiling(){
    if(this.parent){
      return this.parent.children.after(this) 
    }
  }

  moveInTop(targetParent){
    if(targetParent.children.first() !== this){
      this.removeFromParent()
      targetParent.unshiftChild(this)
      if(targetParent.view && targetParent.view.$dom){
        targetParent.view.$dom.prepend(this.$dom)
      }
    }
  }

  moveIn(targetParent){
    if(targetParent.children.last() !== this){
      this.removeFromParent()
      targetParent.pushChild(this)
      if(this.$dom){
        targetParent.view.$dom.appendChild(this.$dom)
      }
    }
  }

  moveBefore(brother){
    if(brother.children.before() !== this){
      this.removeFromParent()
      this.parent = brother.parent
      brother.parent.children.inertBefore(this, brother);
      if(brother.parent.view && brother.parent.view.$dom
        && brother.view && brother.view.$dom
        && this.view && this.$dom)
        brother.parent.view.$dom.insertBefore(this.$dom, brother.view.$dom)
    }
  }

  moveAfter(brother){
    if(brother.children.after() !== this){
      this.removeFromParent()
      this.parent = brother.parent
      brother.parent.children.inertAfter(this, brother);
      if(brother.view && brother.view.$dom 
        && this.view && this.$dom) {
        insterAfter(this.$dom, brother.view.$dom)
      }
    }
  }

  removeFromParent(){
    if(this.parent){
      //this.view.putDown()
      this.parent.children.remove(this)
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
    this.children.add(child) 
    return this
  }

  inertAfterSelf(brother){
    brother.parent = this.parent
    this.parent.children.inertAfter(brother, this);
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

/*  toViewModel(){
    let classList = new RXArray
    classList.add('element');
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
  }*/

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
