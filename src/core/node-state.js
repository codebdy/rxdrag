export class NodeState {
  constructor(node) {
    this.node = node
    this.classList = []
    this.styles = {}
    this.onMousemove = ()=>{/*console.log('mouse move NodeState')*/};
    this.onBegindrag = ()=>{};
    this.onMouseover = (event)=>{};
    this.onMouseout = ()=>{};
    //this.onMouseup = (event)=>{
      //添加结束拖动代码
    //}
    this.onClick = ()=>{rxEditor.clearFocusStates()};
    this.enter = ()=>{}
    this.leave = ()=>{
    }
  }


  judgePosition(event){
    let draggedNode = rxEditor.commandManager.movingCommand.node

    if(this.node.isCharNode){
      return this.judgeCharNodePostion(event)
    }
    let margin = this.node.rule.dropInMargin
    margin = margin ? margin : 0

    let clientWidth = event.srcElement.clientWidth
    let clientHeight = event.srcElement.clientHeight
    let offsetX = event.offsetX
    let offsetY = event.offsetY
    let ratioY = offsetY/clientHeight
    let ratioX = offsetX/clientWidth

    if(margin > 0 && 
      ((this.node.parent && this.node.parent.canAccept(draggedNode)) || !this.node.parent)
      ){
      //左上角小方块区域
      if(offsetY < margin && offsetX < margin){
        return ratioY < ratioX ? 'out-top' :'out-left'
      }

      //右上角小方块区域
      if(offsetY < margin 
        && clientWidth - offsetX < margin){
        return ratioY < (1 - ratioX) ? 'out-top' :'out-right'
      }

      //右下角小方块
      if(clientHeight - offsetY < margin 
        && clientWidth - offsetX < margin){
        return (1 - ratioY) < (1 - ratioX) ? 'out-bottom' :'out-right'
      }

      //左下角小方块
      if(clientHeight - offsetY < margin 
        && offsetX < margin){
        return (1 - ratioY) <  ratioX ? 'out-bottom' :'out-left'
      }

      if(offsetY < margin){
        return 'out-top'
      }

      if(offsetX < margin){
        return 'out-left'
      }

      if(clientHeight - offsetY < margin){
        return 'out-bottom'
      }

      if(clientWidth - offsetX < margin){
        return 'out-right'
      }
    }

    if(this.node.canAccept(draggedNode)){
      if(this.inTop(event) && this.inLeft(event)){
        return ratioY < ratioX ? 'in-top' :'in-left'
      }
      if(this.inTop(event) && !this.inLeft(event)){
        return ratioY < (1 - ratioX) ? 'in-top' :'in-right'
      }
      if(!this.inTop(event) && this.inLeft(event)){
        return (1 - ratioY) < ratioX ? 'in-bottom' :'in-left'
      }
      if(!this.inTop(event) && !this.inLeft(event)){
        return (1 - ratioY) < (1 - ratioX) ? 'in-bottom' :'in-right'
      }
    }

  }

  judgeCharNodePostion(event){
    return this.inLeft(event) ? 'char-left' : 'char-right'
  }

  //-dropInMargin 边界里面，算是拖入内部，外面算是拖入外部
  inTop(event){
    //位于上半部
    if(event.srcElement.clientHeight > event.offsetY*2){
      return true
    }
    return false
  }

  inLeft(event){
    //位于左半部部
    if(event.srcElement.clientWidth > event.offsetX*2){
      return true
    }
    return false
  }

}

export class CanDropState extends NodeState{
  constructor(node) {
    super(node)
    this.onMousemove = (event)=>{
      this.doDragover(event)
      rxEditor.followMouse(event)
    }
    //this.onMouseup = (event)=>{
    //  this.doDrop(event)
    //}
    this.onClick = (event)=>{
      rxEditor.clearFocusStates()
      this.node.changeToState('focusState')
    }
  }

  doDragover(event){
    let command = rxEditor.commandManager.movingCommand
    if(command){
      let position =this.judgePosition(event)
      if(position){
        this.node.changeToState('dragoverState')
        rxEditor.cursor.show(this.judgePosition(event), this.node)
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
    this.enter = ()=>{
      node.changeTextnodeToCharNode()
      if(!this.node.isCharNode){
        rxEditor.activedLabel.show(node.label, node, 1)
      }
    }
    this.leave = ()=>{
      rxEditor.activedLabel.hide()
    }
    this.onMouseout = ()=>{
      this.node.changeToState('normalState')
    }
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

export class FocusState extends CanDropState{
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
    //this.onMousemove = (event)=>{
      //if(this.node.parent){
      //  this.node.parent.changeToState('dragoverState')
      //}
      //rxEditor.followMouse(event)
      //console.log('mouse move DraggedState')
    //};
  }
}