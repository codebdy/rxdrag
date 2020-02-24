export class NodeState {
  constructor(node) {
    this.node = node
    this.classList = []
    this.styles = {}
    this.onMousemove = ()=>{/*console.log('mouse move NodeState')*/};
    this.onBegindrag = ()=>{};
    this.onMouseover = (event)=>{};
    this.onMouseout = ()=>{};
    this.onClick = ()=>{rxEditor.clearFocusStates()};
    this.enter = ()=>{}
    this.leave = ()=>{
    }
  }

  mouseAtBefore(event){
    let margin = this.node.dropMargin 
    return event.offsetX <= margin
        ||event.offsetY <= margin
  }

  mouseAtAfter(event){
    let margin = this.node.dropMargin 
    return event.srcElement.clientWidth - event.offsetX <= margin
        ||event.srcElement.clientHeight - event.offsetY <= margin
  }

  mouseAtLeft(event){
    return event.offsetX <= this.node.widthDropMargin
  }

  mouseAtRight(event){
    return event.srcElement.clientWidth - event.offsetX <= this.node.widthDropMargin
  }

  mouseAtTop(event){
    return event.offsetY <= this.node.heightDropMargin
  }

  mouseAtBottom(event){
    return event.srcElement.clientHeight - event.offsetY <= this.node.heightDropMargin
  }

  mouseAtDropArea(evetn){
    let margin = this.node.dropMargin 
    //console.log(event.offsetX, event.offsetY)
    return event.offsetX > margin
        && event.offsetY > margin
        && event.srcElement.clientWidth - event.offsetX > margin
        && event.srcElement.clientHeight - event.offsetY > margin
  }

}

export class CanDropState extends NodeState{
  constructor(node) {
    super(node)
    this.onMousemove = (event)=>{
      this.doDragover(event)
      rxEditor.followMouse(event)
    }
    this.onClick = (event)=>{
      rxEditor.clearFocusStates()
      this.node.changeToState('focusState')
    }
  }

  doDragover(event){
    let command = rxEditor.commandManager.movingCommand
    if(command){
      command.adoptFromToolbox(this.node)
      rxEditor.clearDraggedoverStates()
      if(this.mouseAtLeft(event) || this.mouseAtTop(event)){

        if(this.node.parent && this.node.parent.canAccept(command.node)){
          command.moveBefore(this.node)
          this.node.parent.changeToState('dragoverState')
        }
        return
      }
      if(this.mouseAtRight(event) || this.mouseAtBottom(event)){
        if(this.node.parent && this.node.parent.canAccept(command.node)){
          command.moveAfter(this.node)
          this.node.parent.changeToState('dragoverState')
        }
        return
      }

      if(this.mouseAtBefore(event)){
        if(this.node.canAccept(command.node)){
          command.moveInTop(this.node)
          this.node.changeToState('dragoverState')
        }
        return
      }
      if(this.mouseAtAfter(event) || this.mouseAtDropArea(event)){
          //console.log('Before accepted')
          if(this.node.canAccept(command.node)){
            command.moveIn(this.node)
            this.node.changeToState('dragoverState')
          }
       
      }
    }

  }

}

export class NormalState extends CanDropState{
  constructor(node) {
    super(node)
    this.onMouseover = (event)=>{
      if(!rxEditor.commandManager.movingCommand){
        rxEditor.clearActiveStates()
        this.node.changeToState('activeState')
      }
    };
  }
}

export class DragoverState extends CanDropState{
  constructor(node) {
    super(node)
    this.classList.push('dragover')
    this.onMouseout = ()=>{
      //console.log('mouse out',this.node.constructor.name)
      this.node.changeToState('normalState')
    };
  }
}

export class ActiveState extends CanDropState{
  constructor(node) {
    super(node)
    this.classList.push('mouse-overed')
    this.enter = ()=>{
      rxEditor.activedLabel.show(node.label, node, 1)
    }
    this.leave = ()=>{
      rxEditor.activedLabel.hide()
    }
    this.onMouseout = ()=>{
      //console.log('mouse out')
      this.node.changeToState('normalState')
    };
    this.onMouseover = (event)=>{
      if(!rxEditor.commandManager.movingCommand){
        rxEditor.clearActiveStates()
        this.node.changeToState('activeState')
      }
    };
  }
}

export class FocusState extends NodeState{
  constructor(node) {
    super(node)
    this.classList.push('focused')
    this.enter = ()=>{
      let dom = node.view.$dom
      rxEditor.focusedLabel.show(node.label, node, 2)
      rxEditor.toolbar.show(node)
      rxEditor.focusedNode = node
    }
    this.leave = ()=>{
      rxEditor.focusedLabel.hide()
      rxEditor.toolbar.hide()
      rxEditor.focusedNode = ''
    }
    this.onClick = (event)=>{
      event.stopPropagation()
    }

    this.onBegindrag = (event)=>{
      //if(this.node.draggable){
      this.preventDefault
      rxEditor.commandManager.startMove(this.node)
      rxEditor.beginFollowMouse(event)
      this.node.changeToState('draggedState')
      //}
    };
  }
}

export class DisableState extends NodeState{
  constructor(node) {
    super(node)
    this.onMousemove = (event)=>{
      event.preventDefault()
      rxEditor.followMouse(event) 
      //console.log('mouse move DisableState')
    };
    this.onMouseout = (event)=>{event.preventDefault()};
  }
}

export class DraggedState extends DisableState{
  constructor(node) {
    super(node)
    this.classList.push('dragged')
    this.onMousemove = (event)=>{
      if(this.node.parent){
        this.node.parent.changeToState('dragoverState')
      }
      rxEditor.followMouse(event)
      //console.log('mouse move DraggedState')
    };
  }
}