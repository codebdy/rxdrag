import {NodeView} from "./node-view"
import {RXArray} from "../basic/rxarray"
import {NormalState, ActiveState, FocusState, DragoverState, DisableState, DraggedState} from "./node-state"


export class Node{
  constructor() {
    this.seedId()
    this.toolboxInfo = {}
  	this.children=new RXArray
  	this.view = new NodeView()
    this.dropMargin = 30;
    this.mouseFollowerWidth = '200px'

    //空表示所有都接受，空数组表示都不接受
    this.acceptedChildren=[]

    //空和空数组都表示所有都不排除
    this.exceptChildren = ''

    this.editMarginStyle = {
      position:'relative', 
      padding:'30px'
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
      if(this.view.domElement){
        this.mouseFollower.offsetX = event.offsetX
        this.mouseFollower.offsetY = -18 + event.offsetY
      }
      this.begindrag(event)
    }

    this.begindragIcon = (event)=>{
      if(this.view.domElement){
        this.mouseFollower.offsetX = this.view.domElement.clientWidth - 96 + event.offsetX
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
      this.inertAfterSelf(this.clone())
      rxEditor.render()
    }

    this.edit = (event)=>{
      console.log('Edit')
      event.stopPropagation()
    }

    this.up = (event)=>{
      if(this.parent){
        this.changeToState('normalState')
        this.parent.changeToState('focusState')
        event.stopPropagation()
      }
    }

    this.delete =()=>{
      if(confirm("Are you sure to delete?")){
        this.removeFromParent()
        //rxEditor.render()
      }
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
    this.$id = Node.idSeed
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

  refreshState(){
    this.view.refreshState(this.toViewModel())
    this.children.forEach(function(child){  
      child.refreshState()
    })
  }

  refresh(){
    this.view.refresh(this.toViewModel(),this.getParentViewDomElement())
    this.children.forEach(function(child){  
      child.refresh()
    })
  }

  createMouseFollower(){
    let followerElement = document.createElement('div')
    followerElement.classList.add('mouse-follow')
    if(!this.parent){
      followerElement.style.width = this.mouseFollowerWidth
    }
    this.renderMouseFollower(followerElement)

    this.mouseFollower.domElement = followerElement
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

  adoptFromToolbox(){
    let draggedNode = rxEditor.draggedNode
    if(draggedNode && !draggedNode.parent && this.canAccept(draggedNode)){
      draggedNode.parent = this
      draggedNode.render()
      draggedNode.changeToState('draggedState')
    }
  }

  getParentViewDomElement(){
    return this.parent.view.domElement
  }

  createChild(nodeName){
    let child = Node.createNode(this, nodeName)
    this.children.add(child) 
    return child
  }

  firstChild(){
    return this.children.first()
  }

  removeFromParent(){
    if(this.parent){
      this.view.putDown()
      this.parent.children.remove(this)
    }
  }

  unshiftChild(child){
    child.parent = this
    this.children.unshift(child) 
  }

  pushChild(child){
    child.parent = this
    this.children.add(child) 
  }

  moveInTop(targetParent){
    if(targetParent.children.first() !== this){
      this.removeFromParent()
      targetParent.unshiftChild(this)
      rxEditor.refresh()
    }
    //else{
    //  console.log('Exist In Top')
    //}
  }

  moveIn(targetParent){
    if(targetParent.children.last() !== this){
      this.removeFromParent()
      targetParent.pushChild(this)
      rxEditor.refresh()
    }
    //else{
    //  console.log('Exist In')
    //}
  }

  moveBefore(brother){
    if(brother.children.before() !== this){
      this.removeFromParent()
      this.parent = brother.parent
      brother.parent.children.inertBefore(this, brother);
      rxEditor.refresh()
    }
    //else{
    //  console.log('Exist In Before')
    //}
  }

  moveAfter(brother){
    if(brother.children.after() !== this){
      this.removeFromParent()
      this.parent = brother.parent
      brother.parent.children.inertAfter(this, brother);
      rxEditor.refresh()
    }
    //else{
    //  console.log('Exist In After')
    //}
  }

  inertAfterSelf(brother){
    brother.parent = this.parent
    this.parent.children.inertAfter(brother, this);
    this.parent.refresh()
  }

  clone(){
    let copy = this.make(this.parent)
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
    if(this.exceptChildren){
      for(var i = 0; i < this.exceptChildren.length; i++){
        if(this.exceptChildren[i] === childName){
          return true
        }
      }
    }

    return false    
  }

  toViewModel(){
    let classList = new RXArray
    classList.add('element');
    classList.push.apply(classList, rxEditor.optionClasses)
    //classList.push.apply(classList, this.$meta.baseClass)
    classList.push.apply(classList, this.state.classList)

    let styles = {}

    if(rxEditor.state.showEditMargin){
      Object.assign(styles, this.editMarginStyle)
    }
    Object.assign(styles, this.state.styles)

    return {
      //text:'test',
      styles:styles,
      classList:classList,
      label:{
          on:{
            onmousedown:this.begindragLabel
          }
      },
      toolbar:{
        up:{
          onclick:this.up
        },
        move:{
          onmousedown:this.begindragIcon
        },
        duplicate:{
          onclick:this.duplicate
        },
        edit:{
          onclick:this.edit
        },
        delete:{
          onclick:this.delete
        }
      },
      attributes:{},
      on:{
        //onmousedown:this.mousedown,
        onmousemove:this.mousemove,
        onmouseover:this.mouseover,
        onmouseout:this.mouseout,
        onclick:this.onclick,
      }
    }
  }

  nodeChanged(node){
    if(this.$id === node.id){
      this.$meta = node.meta
      return;
    }

    this.children.forEach((child)=>{
      child.nodeChanged(node)
    })
  }
}
