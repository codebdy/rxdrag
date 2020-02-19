export class IFrameCommandProxy{
  constructor(workspaceFrame){
    this.workspaceFrame = workspaceFrame
    this.waitingAccembles = {}
    window.addEventListener("message", (event)=>{
        this.handleMessage(event.data);
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

  handleMessage(message){
    switch (message.name) {
      case 'rxeditorReady':
        this.serveForShell.onRxEditorReady()
        break;
      case 'replyAssemble':
        let rxNameId = message.toolboxInfo.rxNameId
        this.waitingAccembles[rxNameId](message.toolboxInfo)
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
      case 'commandsHistoryChanged':
        this.serveForShell.commandsHistoryChanged(message.canUndo, message.canRedo)
        break;
    }
  }

  requestAssemble(rxNameId, replyFunction){
    this.waitingAccembles[rxNameId] = replyFunction
    this.sendMessageToRXEditor({
      name: 'requestAssemble',
      rxNameId:rxNameId
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