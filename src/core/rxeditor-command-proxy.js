export class RXEditorCommandProxy{
  constructor(pageId){
    this.pageId = pageId
    window.addEventListener("message", (event)=>{
      if(this.pageId === event.data.pageId){
        this.handleMessage(event.data)
      }
    });

    this.focusNode = (node, pageId)=>{
      this.sendMessage({
        name: 'focusNode',
        pageId: pageId,
        node:{
          id:node.id,
          ruleName:node.ruleName,
          meta:node.meta,
          defaultMeta:node.defaultMeta,
          optionsSchema:node.rule.optionsSchema,
          htmlCode:node.htmlCode,
        }
      })
    }

    this.unFocusNode = (node)=>{
      this.sendMessage({
        name: 'unFocusNode',
        id: node.id,
      })
    }

    document.addEventListener('mouseup', (event)=>{
      this.sendMessage({
        name: 'canvasMouseup',
      })
    })

    document.addEventListener('mousemove', (event)=>{
      this.canvasMouseMove(event)
    })

  }

  canvasMouseMove(event){
    this.sendMessage({
      name: 'canvasMouseMove',
      event: {
        screenX: event.screenX,
        screenY: event.screenY,
      },
    })
  }

  rxeditorReady(){
    this.sendMessage({
      name: 'rxeditorReady'
    })
  }

  commandExcuted(canUndo, canRedo, commandSchema){
    this.sendMessage({
      name: 'commandExcuted',
      canUndo: canUndo,
      canRedo:canRedo,
      commandSchema: commandSchema,
    })
  }

  takeOverDraggingByWorkspace(){
    this.sendMessage({
      name: 'takeOverDraggingByWorkspace'
    })
  }

  saveCodeFiles(innerHTML, json){
    this.sendMessage({
      name: 'saveCodeFiles',
      innerHTML:innerHTML,
      json:json,
    })
  }


  handleMessage(message){
    //console.log('received:' + message.name + ":" + message.rxNameId)
    switch (message.name) {
      case 'requestAssemble':
        let loadedData = this.serveForRXEditor.assembleWithTheme(message.theme)
        this.sendMessage({
          name: 'replyAssemble',
          toolbox: loadedData.toolbox,
          treeViewNodes: loadedData.treeViewNodes,
        })
        break;
      case 'draggingFromToolbox':
        this.serveForRXEditor.dragFromToolbox(message.item)
        break;
      case 'endDragFromToolbox':
        this.serveForRXEditor.endDragFromToolbox(message.rxNameId)
        break;
      case 'changeCanvasState':
        this.serveForRXEditor.changeCanvasState(message.state)
        break;
      case 'nodeChanged':
        this.serveForRXEditor.nodeChanged(message.node)
        break;
      case 'undo':
        this.serveForRXEditor.undo()
        break;
      case 'redo':
        this.serveForRXEditor.redo()
        break;
      //case 'download':
      //  this.serveForRXEditor.download()
      //  break;
      case 'clearCanvas':
        this.serveForRXEditor.clearCanvas()
        break;
      case 'changeTheme':
        this.serveForRXEditor.changeTheme(message.theme)
        break;
      case 'focusNodeFromShell':
        this.serveForRXEditor.focusNodeFromShell(message.node)
        break;
      case 'duplicateNodeFromShell':
        this.serveForRXEditor.duplicateNodeFromShell(message.id)
        break;
      case 'removeNodeFromShell':
        this.serveForRXEditor.removeNodeFromShell(message.id)
        break;
      case 'requestHtmlCode':
        let htmlCode = this.serveForRXEditor.requestHtmlCode()
        this.sendMessage({
          name: 'replyHtmlCode',
          htmlCode: htmlCode,
        })
        break;
      case 'loadHtml':
        this.serveForRXEditor.loadHtml(message.html, message.id)
        break;
      case 'setInlineFile':
        this.serveForRXEditor.setInlineFile(message.file)
        break;
    }
  }


  sendMessage(message){
    message.pageId = this.pageId
    message.canvasHeight = document.body.scrollHeight
    window.parent.postMessage(message, '/');    
  }
}

