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
        showMarginX : state.showMarginX,
        showMarginY : state.showMarginY,
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

  focusNodeFromShell(node){
    this.sendMessageToRXEditor({
      name:'focusNodeFromShell',
      node:node,
    })
  }

  duplicateNodeFromShell(id){
    this.sendMessageToRXEditor({
      name:'duplicateNodeFromShell',
      id:id,
    })
  }

  removeNodeFromShell(id){
    this.sendMessageToRXEditor({
      name:'removeNodeFromShell',
      id:id,
    })
  }

  requestHtmlCode(){
    this.sendMessageToRXEditor({
      name:'requestHtmlCode',
    })
  }

  loadHtml(html, id = ''){
    this.sendMessageToRXEditor({
      name:'loadHtml',
      id: id,
      html : html,
    })
  }

  setInlineFile(file){
    this.sendMessageToRXEditor({
      name:'setInlineFile',
      file : file,
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
        $rxbus.$emit('endFollowMouse')
        break;
      case 'focusNode':
        $rxbus.$emit('focusNode', message.node, message.pageId)
        break;
      case 'unFocusNode':
        $rxbus.$emit('unFocusNode', message.id, message.pageId)
        break;
      case 'commandExcuted':
        $rxbus.$emit('commandExcuted', message.canUndo, message.canRedo, message.commandSchema, message.pageId)
        break;
      case 'saveCodeFiles':
        $rxbus.$emit('saveCodeFiles', message.innerHTML)
        break;
      case 'canvasMouseup':
        $rxbus.$emit('canvasMouseup', message.event)
        break;
      case 'canvasMouseMove':
        $rxbus.$emit('canvasMouseMove', message.event)
        break;
      case 'replyHtmlCode':
        $rxbus.$emit('replyHtmlCode', message.htmlCode)
        break;
    }

    $rxbus.$emit('canvasHeight', message.canvasHeight, message.pageId)
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