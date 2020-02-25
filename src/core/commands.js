function insterAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }
  else{
    parent.insertBefore(newElement,targetElement.nextSibling);
  }              
}

class CommandMovable{
  constructor(node){
    this.node = node
    this.oldParent = node.parent
    this.oldnNextSbiling = node.nextSbiling()
  }

  moveInTop(targetParent){
    this.node.moveInTop(targetParent)
    this.storeNewInfo()
  }


  moveBefore(brother){
    this.node.moveBefore(brother)
    this.storeNewInfo()
  }

  moveAfter(brother){
    this.node.moveAfter(brother)
    this.storeNewInfo()
  }


  moveIn(targetParent){
    this.node. moveIn(targetParent)
    this.storeNewInfo()
  }

  storeNewInfo(){
    this.newParent = this.node.parent
    this.newNextSbiling = this.node.nextSbiling()
  }

  adoptFromToolbox(parent){
    let draggedNode = this.node
    if(draggedNode && !draggedNode.parent && parent.canAccept(draggedNode)){
      draggedNode.parent = parent
      draggedNode.render()
      draggedNode.changeToState('draggedState')
    }
  }

  finish(){
    let draggedNode = this.node
    draggedNode.changeToState('focusState')
    if(draggedNode.parent){
      draggedNode.parent.changeToState('normalState')
    }
  }

  excute(){
    this.node.removeFromParent()
    if(this.newNextSbiling){
      this.node.moveBefore(this.newNextSbiling)
    }
    else if(this.newParent){
      this.newParent.pushChild(this.node)
    }
  }

  undo(){
    this.node.removeFromParent()
    if(this.oldnNextSbiling){
      this.node.moveBefore(this.oldnNextSbiling)
    }
    else if(this.oldParent)
    {
      this.oldParent.pushChild(this.node)
    }
  }
  
}

class CommandNew extends CommandMovable{
  constructor(node) {
   super(node)
  }
}

class CommandMove extends CommandMovable{
  constructor(node) {
   super(node)
  }
}

class CommandDelete{
  constructor(node) {
    this.node = node
    this.oldParent = node.parent
    this.oldnNextSbiling = node.nextSbiling()
  }

  excute(){
    this.node.removeFromParent()
  }

  undo(){
    if(this.oldnNextSbiling){
      this.node.moveBefore(this.oldnNextSbiling)
    }
    else{
      this.oldParent.pushChild(this.node)
    }

  }
}

class CommandClone{
  constructor(node) {
    this.node = node
    this.copy = node.clone()
  }

  excute(){
    this.copy.moveAfter(this.node)
  }

  undo(){
    this.copy.removeFromParent()
  }
}

class CommandChangeNode{
  constructor(node, newMeta) {
    this.node = node
    this.oldMeta = JSON.parse(JSON.stringify(node.$meta))
    this.newMeta = JSON.parse(JSON.stringify(newMeta))
  }

  excute(){
    this.node.$meta = JSON.parse(JSON.stringify(this.newMeta))
  }

  undo(){
    this.node.$meta = JSON.parse(JSON.stringify(this.oldMeta))
  }
}


class CommandTextEdit{
  constructor(node) {
    this.node = node
    this.oldInnerHtml = node.$meta.innerHTML
  }

  finished(){
    this.newInnerHtml = this.node.$meta.innerHTML
  } 

  excute(){
    this.node.$meta.innerHTML = this.newInnerHtml
  }

  undo(){
    this.node.$meta.innerHTML = this.oldInnerHtml
  }
}

export class CommadManager{
  constructor() {
    this.undoCommands = []
    this.redoCommands = []
    this.onCommandsChanged = (canUndo, canRedo)=>{
    }
  }

  getDraggedNode(){
    if(this.movingCommand){
      return this.movingCommand.node
    }
  }
  startNew(node){
    let cmd = new CommandNew(node)
    this.startCommand(cmd)
  }

  startMove(node){
    let cmd = new CommandMove(node)
    this.startCommand(cmd)
  }

  duplicate(node){
    let cmd = new CommandClone(node)
    cmd.excute()
    this.finished(cmd)
  }

  changeNode(node, newNodeData){
    //node.$meta = newNodeData.meta
    let cmd = new CommandChangeNode(node, newNodeData.meta)
    cmd.excute()
    this.finished(cmd)
  }

  deleteNode(node){
    let cmd = new CommandDelete(node)
    cmd.excute()
    this.finished(cmd)
  }

  startCommand(command){
    this.movingCommand = command
  }

  finishMoving(){
    if(this.movingCommand){
      this.movingCommand.finish()
      this.finished(this.movingCommand)
      this.movingCommand = ''
    }
  }

  startEditText(node){
    this.textCommand = new CommandTextEdit(node)
  }

  finishEditText(){
    this.textCommand.finished()
    this.finished(this.textCommand)
    this.textCommand = ''
  }

  finished(command){
    this.undoCommands.push(command)
    this.redoCommands.length = 0
    this.submitChanged(command)
  }

  undo(){
    let command = this.undoCommands.pop()
    command.undo()
    this.redoCommands.push(command)
    this.submitChanged()
  }

  redo(){
    let command = this.redoCommands.pop()
    command.excute()
    this.undoCommands.push(command)
    this.submitChanged()
  }

  submitChanged(command){
    this.onCommandsChanged(this.undoCommands.length > 0, this.redoCommands.length > 0, command)
  }

}