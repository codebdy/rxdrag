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
  }

  moveInTop(targetParent){
    let node = this.node
    if(targetParent.children.first() !== node){
      node.removeFromParent()
      targetParent.unshiftChild(node)
      if(targetParent.view && targetParent.view.$dom){
        targetParent.view.$dom.prepend(node.view.$dom)
      }
    }
  }

  moveBefore(brother){
    let node = this.node
    if(brother.children.before() !== node){
      node.removeFromParent()
      node.parent = brother.parent
      brother.parent.children.inertBefore(node, brother);
      if(brother.parent.view && brother.parent.view.$dom
        && brother.view && brother.view.$dom
        && node.view && node.view.$dom)
        brother.parent.view.$dom.insertBefore(node.view.$dom, brother.view.$dom)
      //rxEditor.refresh()
    }
  }

  moveAfter(brother){
    let node = this.node
    if(brother.children.after() !== node){
      node.removeFromParent()
      node.parent = brother.parent
      brother.parent.children.inertAfter(node, brother);
      if(brother.view && brother.view.$dom 
        && node.view && node.view.$dom) {
        insterAfter(node.view.$dom, brother.view.$dom)
        //brother.parent.view.$dom.
      }
      //rxEditor.refresh()
    }
  }


  moveIn(targetParent){
    let node = this.node
    if(targetParent.children.last() !== node){
      node.removeFromParent()
      targetParent.pushChild(node)
      if(node.view.$dom){
        targetParent.view.$dom.appendChild(node.view.$dom)
      }
    }
  }

  adoptFromToolbox(parent){
    let draggedNode = this.node
    if(draggedNode && !draggedNode.parent && parent.canAccept(draggedNode)){
      draggedNode.parent = parent
      draggedNode.render()
      draggedNode.changeToState('draggedState')
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
    this.onCommandsChanged(this.undoCommands.length > 0, this.redoCommands.length > 0)
  }

  undo(){
    let command = this.undoCommands.pop()
    command.undo()
    this.redoCommands.push(command)
  }

  redo(){
    let command = this.redoCommands.pop()
    command.excute()
    this.undoCommands.push(command)
  }

}