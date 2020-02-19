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

  redo(){
    this.node.removeFromParent()
    if(this.newNextSbiling){
      this.node.insertBefore(this.newNextSbiling)
    }
    else if(this.newParent){
      console.log('redo')
      this.newParent.pushChild(this.node)
    }
  }

  undo(){
    this.node.removeFromParent()
    if(this.oldnNextSbiling){
      this.node.insertBefore(this.oldnNextSbiling)
    }
    else if(this.oldParent)
    {
      this.oldParent.pushChild(this.node)
    }
  }
  
}

export class CommandNew extends CommandMovable{
  constructor(node) {
   super(node)
  }

}

export class CommandMove extends CommandMovable{
  constructor(node) {
   super(node)
  }
}

export class CommandClone{
  constructor(node, copy) {
    this.node = node
    this.copy = copy
  }
}

export class CommandChangeNode{
  constructor(node, oldMeta) {
    this.node = node
    this.oldMeta = oldMeta
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

  duplicate(node, copy){
    let cmd = new CommandClone(node, copy)
    this.finished(cmd)
  }

  changeNode(node, oldMeta){
    let cmd = new CommandChangeNode(node, oldMeta)
    this.finished(cmd)
  }

  startCommand(command){
    this.movingCommand = command
  }

  finishMovingComand(){
    if(this.movingCommand){
      this.finished(this.movingCommand)
      this.movingCommand = ''
    }
  }

  finished(command){
    this.undoCommands.push(command)
    this.redoCommands.length = 0
    this.submitChanged()
  }

  undo(){
    let command = this.undoCommands.pop()
    command.undo()
    this.redoCommands.push(command)
    this.submitChanged()
  }

  redo(){
    let command = this.redoCommands.pop()
    command.redo()
    this.undoCommands.push(command)
    this.submitChanged()
  }

  submitChanged(){
    this.onCommandsChanged(this.undoCommands.length > 0, this.redoCommands.length > 0)
  }

}