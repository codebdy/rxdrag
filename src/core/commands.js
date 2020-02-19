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

export class CommadManager{
  constructor() {
    this.undoCommands = []
    this.redoCommands = []
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

  startCommand(command){
    this.movingCommand = command
  }

  finishedComand(){
    if(this.movingCommand){
      this.undoCommands.push(this.movingCommand)
      this.movingCommand = ''
      this.redoCommands.length = 0
    }
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