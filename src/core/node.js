import {NodeView} from "./node-view"
import {add, remove, first, last, insertBefore,insertAfter, contains, after, before} from "../basic/rxarray"
import {NormalState, ActiveState, FocusState, DragoverState, DisableState, DraggedState, EditState, PreviewState} from "./node-state"

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
    //this.mouseFollowerWidth =  '200px'
  	this.children = []
  	this.view = new NodeView()

    //基础数据，持久化也是这部分数据
    this.meta = {
      tag : 'div',
      classList : [],
      styles : {},
      attributes : {},
    }

    this.defaultMeta = {
      tag : 'div',
      classList : [],
      styles : {},
      attributes : {},
    }
    
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
      event.stopPropagation()
      this.state.onMousemove(event)
      rxEditor.canvasMouseMove(event)
    }
    this.mouseover = (event)=>{
      event.stopPropagation()
      this.state.onMouseover(event)
    }
    this.mouseout = (event)=>{
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
    this.editState = new EditState(this)
    this.previewState = new PreviewState(this)
    this.state = this.normalState
  }

  markDefaultMeta(){
    this.defaultMeta.tag = this.meta.tag
    this.defaultMeta.classList = this.meta.classList.concat()
    this.defaultMeta.attributes = Object.assign({}, this.meta.attributes) 
    this.defaultMeta.styles = Object.assign({}, this.meta.styles) 
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

  renderHtml(parentDomElement){
    let dom = this.view.renderHtml(this.toHtmlModel(), parentDomElement)
    this.children.forEach((child)=>{  
      child.renderHtml(dom)
    })

    parentDomElement.appendChild(dom)
    return dom
  }

  refreshState(){
    this.view.refreshState(this.toViewModel())
    this.children.forEach(function(child){  
      child.refreshState()
    })
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

  clearFocusAndEditStates(){
    if(this.state === this.focusState || this.state === this.editState){
      this.changeToState('normalState')
    }
    this.children.forEach(function(child){  
      child.clearFocusAndEditStates()
    })
  }

  allToNormalState(){
    this.changeToState('normalState')
    this.children.forEach((child)=>{  
      child.allToNormalState()
    })
  }

  draggedToFoused(){
    if(this.state === this.draggedState){
      this.changeToState('focusState')
    }
    this.children.forEach(function(child){  
      child.draggedToFoused()
    })
  }

  getParentViewDomElement(){
    return this.parent.view.$dom
  }

  firstChild(){
    return first(this.children)
  }

  nextSbiling(){
    if(this.parent){
      return after(this, this.parent.children) 
    }
  }

  previousSbiling(){
    if(this.parent){
      return before(this, this.parent.children) 
    }
  }

  moveInTop(targetParent){
    if(first(targetParent.children) !== this){
      this.removeFromParent()
      targetParent.unshiftChild(this)
      targetParent.render()
    }
  }

  moveIn(targetParent){
    if(last(targetParent.children) !== this){
      this.removeFromParent()
      targetParent.pushChild(this)
      targetParent.render()
    }
  }

  moveBefore(brother){
    if(before(brother, this.children) !== this){
      this.removeFromParent()
      this.parent = brother.parent
      insertBefore(this, brother, brother.parent.children);
      this.parent.render()
    }
  }

  moveAfter(brother){
    if(after(brother, this.children) !== this){
      this.removeFromParent()
      this.parent = brother.parent
      insertAfter(this, brother, brother.parent.children);
      this.parent.render()
    }
  }

  removeFromParent(){
    if(this.parent){
      remove(this, this.parent.children)
      this.parent.render()
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
    // /console.log(copy)
    copy.rule = JSON.parse(JSON.stringify(this.rule))
    copy.ruleName = this.ruleName
    this.children.forEach((child)=>{  
      copy.pushChild(child.clone())
    })
    return copy
  }

  canAccept(child){
    let acceptedChildren = this.rule ? this.rule.acceptedChildren : ''
    if(acceptedChildren  && acceptedChildren.length == 0){
      return false
    }

    if(acceptedChildren && !this.containsInAccepted(child)){
      return false
    }

    if(!acceptedChildren && this.containsInExcept(child)){
      return false
    }
    return true
  }


  containsInAccepted(child){
    let childRuleName = child.ruleName
    let acceptedChildren = this.rule ? this.rule.acceptedChildren : ''
    for(var i = 0; i < acceptedChildren.length; i++){
      if(acceptedChildren[i] === childRuleName){
        return true
      }
    }

    return false
  }

  containsInExcept(child){
    let childRuleName = child.ruleName
    let rejectChildren = this.rule ? this.rule.rejectChildren : ''
    if(rejectChildren){
      for(var i = 0; i < rejectChildren.length; i++){
        if(rejectChildren[i] === childRuleName){
          return true
        }
      }
    }

    return false    
  }

  toViewModel(){
    let model = this.state.stateModel()

    model.on = {
      onmousemove:this.mousemove,
      onmouseover:this.mouseover,
      onmouseout:this.mouseout,
      //onmouseup:this.mouseup,
      onclick:this.onclick,
    }

    return model
  }

  toHtmlModel(){
    return {      
      styles:{},
      classList:[],//new RXArray,
      attributes:{},
    }
  }

  toTreeViewNode(){
    let view = {
      label: this.label,
      tag:this.meta.tag,
      id: this.id,
      state:this.getStateName(),
      children: [],
    }

    this.children.forEach((child)=>{
      let childView = child.toTreeViewNode()
      if(childView){
        view.children.push(childView)
      }
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

  clearCharNodes(){
    this.children.forEach(child=>{
      child.clearCharNodes()
    })
  }

  getNodeById(id){
    if(id === this.id){
      return this
    }

    for(var i in this.children){
      let node = this.children[i].getNodeById(id)
      if(node){
        return node
      }
    }
  }

  preview(){
    this.changeToState('previewState')
    this.children.forEach(child=>{
      child.preview()
    })
  }
}
