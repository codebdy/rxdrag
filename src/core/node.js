import {NodeView} from "./node-view"
import {RXArray} from "../basic/rxarray"
import {NormalState, ActiveState, DragoverState, DisableState, DraggedState} from "./node-state"


export class Node{
  constructor() {
    this.toolboxInfo = {
      moduleName:'not define',//工具栏组名称
      elementName:'not define' //工具栏项目名称
    }
  	this.children=new RXArray
  	this.view = new NodeView()
    this.draggable = true
    this.dropMargin = 30;
    this.padding = '30px'
    this.mouseFollowerWidth = '200px'

    //空表示所有都接受，空数组表示都不接受
    this.acceptedChildren=[]

    //空和空数组都表示所有都不排除
    this.exceptChildren = ''

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

    this.duplicate = ()=>{
      this.changeToState('normalState')
      this.inertAfterSelf(this.clone())
      rxEditor.render()
    }

    this.edit = ()=>{
      console.log('Edit')
    }

    this.delete =()=>{
      if(confirm("Are you sure to delete?")){
        this.removeFromParent()
        //rxEditor.render()
      }
    }

  }

  initStates(){
    this.normalState = new NormalState(this)
    this.activeState = new ActiveState(this)
    this.dragoverState = new DragoverState(this)
    this.draggedState = new DraggedState(this)
    this.disableState = new DisableState(this)
    this.state = this.normalState
  }

  changeToState(stateName){
    this.state = this[stateName]
    this.refreshState()
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
    this.children.push(child) 
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
    this.children.push(child) 
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
    let classList = ['element-outline','element'];
    classList.push.apply(classList, this.state.classList)
    let styles = {
      padding: this.padding,
      position:'relative'
    }

    Object.assign(styles, this.state.styles)

    return {
      name:'div',
      //text:'test',
      styles:styles,
      classList:classList,
      label:{
          on:{
            onmousedown:this.begindragLabel
          }
      },
      toolbar:{
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
      }
    }
  }
}
