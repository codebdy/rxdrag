export class RXEditorCommandProxy{
  constructor(){
    window.addEventListener("message", (event)=>{
        this.handleMessage(event.data)
    });

    this.focusNode = (node)=>{
      console.log('focused node:' + node.$id)
    }
  }

  rxeditorReady(){
    this.sendMessage({
      name: 'rxeditorReady'
    })
  }

  takeOverDraggingByWorkspace(){
    this.sendMessage({
      name: 'takeOverDraggingByWorkspace'
    })
  }


  handleMessage(message){
    //console.log('received:' + message.name + ":" + message.rxNameId)
    switch (message.name) {
      case 'requestAssemble':
        let toolboxInfo = this.serveForRXEditor.getElementDefine(message.rxNameId)
        this.sendMessage({
          name:'replyAssemble',
          toolboxInfo:toolboxInfo
        })
        break;
      case 'draggingFromToolbox':
        this.serveForRXEditor.dragFromToolbox(message.rxNameId)
        break;

      case 'endDragFromToolbox':
        this.serveForRXEditor.endDragFromToolbox(message.rxNameId)
        break;
      case 'changeCanvasState':
        this.serveForRXEditor.changeCanvasState(message.state)
        break;
    }
  }


  sendMessage(message){
    window.parent.postMessage(message, '/');    
  }
}

