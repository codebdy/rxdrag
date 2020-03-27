export class IFrameCommandProxy{
  constructor(pageId){
    this.pageId = pageId
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

  draggingFromToolbox(item){
    this.sendMessageToRXEditor({
      name:'draggingFromToolbox',
      item:item
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
        //this.waitingAccembleToolbox(message.toolbox)
        this.waitingAccembleTreeView(message.treeViewNodes)
        break;
      case 'takeOverDraggingByWorkspace':
        $bus.$emit('endFollowMouse')
        break;
      case 'focusNode':
        $bus.$emit('focusNode', message.node, message.pageId)
        break;
      case 'unFocusNode':
        $bus.$emit('unFocusNode', message.id, message.pageId)
        break;
      case 'commandExcuted':
        $bus.$emit('commandExcuted', message.canUndo, message.canRedo, message.commandSchema, message.pageId)
        break;
      case 'saveCodeFiles':
        $bus.$emit('saveCodeFiles', message.innerHTML)
        break;
    }

    $bus.$emit('canvasHeight', message.canvasHeight, message.pageId)
  }

  requestAssemble(theme, toolBoxReplyFunction, treeViewReplyFunction){
    //this.waitingAccembleToolbox = toolBoxReplyFunction
    this.waitingAccembleTreeView = treeViewReplyFunction
    this.sendMessageToRXEditor({
      name: 'requestAssemble',
      theme: theme,
    })
  }


  sendMessageToRXEditor(message){
    let iframe = this.iframe;
    message.pageId = this.pageId
    if(iframe && iframe.contentWindow){
      iframe.contentWindow.postMessage(message, '/')
    }
  }


}