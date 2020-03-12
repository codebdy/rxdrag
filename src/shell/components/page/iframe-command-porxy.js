export class IFrameCommandProxy{
  constructor(workspaceFrame, pageId){
    this.pageId = pageId
    this.workspaceFrame = workspaceFrame
    //this.waitingAccembles = {}
    window.addEventListener("message", (event)=>{
      let message = event.data
      if(message.pageId === this.pageId){
        this.handleMessage(event.data);
      }
    });
  }

  endDragFromToolbox(){
    this.sendMessageToRXEditor({
      name:'endDragFromToolbox'
    })
  }

  draggingFromToolbox(rxNameId){
    this.sendMessageToRXEditor({
      name:'draggingFromToolbox',
      rxNameId:rxNameId
    })
  }

  changeCanvasState(state){
    this.sendMessageToRXEditor({
      name : 'changeCanvasState',
      state : {
        screenWidth : state.screenWidth,
        preview : state.preview,
        showEditMargin : state.showEditMargin,
        showOutline : state.showOutline,
        showLabel : state.showLabel,
      }
    })
  }

  nodeChanged(node){
    this.sendMessageToRXEditor({
      name:'nodeChanged',
      node:node
    })
  }

  redo(){
    this.sendMessageToRXEditor({
      name:'redo'
    })
  }

  undo(){
    this.sendMessageToRXEditor({
      name:'undo'
    })
  }

  download(){
    this.sendMessageToRXEditor({
      name:'download'
    })
  }

  clearCanvas(){
    this.sendMessageToRXEditor({
      name:'clearCanvas'
    })
  }

  changeTheme(theme){
    this.sendMessageToRXEditor({
      name:'changeTheme',
      theme:theme,
    })
  }

  focusNodeFromSchell(node){
    this.sendMessageToRXEditor({
      name:'focusNodeFromSchell',
      node:node,
    })
  }

  handleMessage(message){
    switch (message.name) {
      case 'rxeditorReady':
        this.serveForShell.onRxEditorReady()
        break;
      case 'replyAssemble':
        //let rxNameId = message.toolboxInfo.rxNameId
        this.waitingAccembleToolbox(message.toolbox)
        this.waitingAccembleTreeView(message.treeViewNodes)
        break;
      case 'takeOverDraggingByWorkspace':
        this.serveForShell.endFollowMouse()
        break;
      case 'focusNode':
        this.serveForShell.focusNode(message.node)
        break;
      case 'unFocusNode':
        this.serveForShell.unFocusNode(message.id)
        break;
      case 'commandExcuted':
        this.serveForShell.commandExcuted(message.canUndo, message.canRedo, message.commandSchema)
        break;
      case 'saveCodeFiles':
        this.serveForShell.saveCodeFiles(message.innerHTML, message.json)
        break;
    }
  }

  requestAssemble(theme, toolBoxReplyFunction, treeViewReplyFunction){
    this.waitingAccembleToolbox = toolBoxReplyFunction
    this.waitingAccembleTreeView = treeViewReplyFunction
    this.sendMessageToRXEditor({
      name: 'requestAssemble',
      theme: theme,
    })
  }


  sendMessageToRXEditor(message){
    let iframe = this.workspaceFrame;
    if(iframe){
      iframe.contentWindow.postMessage(message, '/')
      window.postMessage(message, '/');    
    }
  }


}