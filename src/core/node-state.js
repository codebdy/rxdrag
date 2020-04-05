export class NodeState {
  constructor(node) {
    this.node = node
    this.classList = []
    this.styles = {}
    this.attributes = {/*contenteditable:'false'*/}
    this.onMousemove = ()=>{/*console.log('mouse move NodeState')*/};
    this.onBegindrag = ()=>{};
    this.onMouseover = (event)=>{};
    this.onMouseout = ()=>{};
    //this.onMouseup = (event)=>{
      //添加结束拖动代码
    //}
    this.onClick = ()=>{
      rxEditor.clearFocusAndEditStates()
    }
    this.enter = ()=>{}
    this.leave = ()=>{
    }
  }

  stateModel(){
    let classList = []
    classList.push.apply(classList, this.classList)
   
    let model = {
      styles:Object.assign({}, this.styles),
      classList:classList,
      attributes: Object.assign({}, this.attributes),
    }

    this.addtionToModel(model)
    return model
  }

  addtionToModel(model){
    model.classList.push.apply(model.classList, rxEditor.optionClasses)
    let node = this.node
    if((rxEditor.state.showMarginX && node.rule.editMarginStyle)
      || (node.children.length === 0 && node.rule.empertyMargin)
      ){
      model.styles['padding-left'] = node.rule.editMarginStyle ? node.rule.editMarginStyle.paddingX : 0
      model.styles['padding-right'] = node.rule.editMarginStyle ? node.rule.editMarginStyle.paddingX : 0
    }
    if((rxEditor.state.showMarginY && node.rule.editMarginStyle)
      || (node.children.length === 0 && node.rule.empertyMargin)
      ){
      model.styles['padding-top'] = node.rule.editMarginStyle ? node.rule.editMarginStyle.paddingY : 0
      model.styles['padding-bottom'] = node.rule.editMarginStyle ? node.rule.editMarginStyle.paddingY : 0
    }

    //添加for后，编辑时无法选中
    if(model.attributes.for){
      model.attributes.for = ''
    }

    model.attributes.draggable = "false"

    return model
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
      rxEditor.clearFocusAndEditStates()
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
    this.classList.push('rx-_-dragover')
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
    this.classList.push('rx-_-mouse-overed')
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
    this.classList.push('rx-_-focused')
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
    this.classList.push('rx-_-dragged')
    this.enter = ()=>{
      document.body.classList.add('one-element-dragged')
    }
    this.leave = ()=>{
      document.body.classList.remove('one-element-dragged')
    }
  }
}

export class EditState extends FocusState{
  constructor(node) {
    super(node)
    this.classList.push('rx-_-editing')
    this.enter = ()=>{
      this.attributes.contenteditable = 'true'
      let dom = node.view.$dom
      rxEditor.focusedLabel.show(node.label, node, 2)
      rxEditor.toolbar.show(node)
      rxEditor.focusedNode = node
      rxEditor.miniEditbar.show(this.node.view.$dom)
      rxEditor.commandManager.startEditText(node)
      node.render()
    }

    this.leave = ()=>{
      rxEditor.focusedLabel.hide()
      rxEditor.toolbar.hide()
      rxEditor.focusedNode = ''
      rxEditor.miniEditbar.hide()

      rxEditor.commandManager.finishEditText()
      this.node.render()
    }
  }
}

export class PreviewState extends NodeState{
  constructor(node) {
    super(node)
    this.onClick = ()=>{};
  }

  addtionToModel(model){
    return model
  }
}
