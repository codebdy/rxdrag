import {RXEditor} from "../core/rxeditor"
import {CanvasState} from "../core/canvas-state"
import {Drawer} from "./drawer"
import {Toolbar} from "./toolbar"
import initEditor from "./init-editor"
import {IFrameCommandProxy} from "./iframe-command-porxy"
import {EditorState} from "./editor-state"
import {RXComponent} from "../basic/rxcomponent"

var JSZip = require("jszip")
//var zip = new JSZip()

class Workspace extends RXComponent{
  constructor(config){
    super()
    this.config = config
    this.cssClass('rx-workspace')
    this.domAttr('id', "workspace")
  }

  render(parentElement){
    super.render(parentElement)

    let iframe = document.createElement('iframe')
    this.iframe = iframe
    iframe.src="javascript:0"
    iframe.frameBorder="0"
    iframe.border="0"
    iframe.allowTransparency="no"
    iframe.scrolling = "auto"
    iframe.height = "100%"
    this.$dom.appendChild(iframe)

    let iframedocument =  iframe.contentDocument;
    let iframeContent = `
        <html style="width:100%;height:100%;">
          <head>
            <title>RXEditor Workspace</title>
            <link rel=stylesheet href="${this.config.mainCss}">
            <link rel="stylesheet" href="${this.config.bootstrapCss}">
            <link href="${this.config.fontAwesome}" rel="stylesheet">
          </head>
          <body style="background-color:#FFF;padding:0;width:100%; height:100%;">
            <div id="canvas"></div>
            <script type="text/javascript" src="${this.config.mainJs}"></script>
            <script>
              rxEditor.hangOn('canvas', new RXEditorCommandProxy);
            </script>
          </body>
        </html>
      `
    iframedocument.open();
    iframedocument.write(iframeContent);
    iframedocument.close();
    return 
  }

  resizeScreen(size){
    if(size == 'xl'){
      this.iframe.width="100%"
    }
    if(size == 'lg'){
      this.iframe.width="1199px"
    }
    if(size == 'md'){
      this.iframe.width="991px"
    }
    if(size == 'sm'){
      this.iframe.width="767px"
    }
    if(size == 'xs'){
      this.iframe.width="575"
    }
  }

}

export class RXEditorFM{
  constructor(){
    initEditor()
    this.state = new EditorState
    this.canvasState = new CanvasState
    this.itemRxNameIds = []
  }

  assemble(rxNameId){
    this.itemRxNameIds.push(rxNameId)
  }

  hangOn(id, config){
    this.domElement = document.getElementById(id)
    this.domElement.classList.add('rx-editor')

    this.workspace = new Workspace(config)
    new RXComponent().cssClass('rx-left-area')
                     .pushChild(new Toolbar(this, true))
                     .pushChild(this.workspace)
                     .render(this.domElement)
    this.workspace.resizeScreen(this.state.screenWidth)

    this.drawer = new Drawer()
    this.drawer.optionBox.screenWidth = this.state.screenWidth

    this.state.watch('screenWidth', (state)=>{
      this.workspace.resizeScreen(state.screenWidth)
      this.drawer.optionBox.resizeScreen(state.screenWidth)
    })

    this.state.watch('showDrawer', (state)=>{
      this.drawer.$dom.style.width = state.showDrawer ? '250px' : '0'
    })

    this.commandProxy = new IFrameCommandProxy(this.workspace.iframe)
    this.commandProxy.serveForShell = this

    this.canvasState.watch('changed', (state)=>{
      this.commandProxy.changeCanvasState(state)
    })
  }

  onRxEditorReady(){
    this.drawer.render(this.domElement)
    //请求所有可装配元素
    for(var i in this.itemRxNameIds){
      this.commandProxy.requestAssemble(this.itemRxNameIds[i], this.drawer.toolbox.assembleToolboxItem)
    }

    //跟踪工具拖拽
    this.drawer.toolbox.on('draggingFromToolbox', (rxNameId)=>{
      this.draggingFromToolbox(rxNameId)
    })

    this.drawer.toolbox.on('endDragFromToolbox', (rxNameId)=>{
        if(this.commandProxy){
        this.commandProxy.endDragFromToolbox()
      }
    })

    this.drawer.optionBox.valueChanged = (node)=>{
      this.commandProxy.nodeChanged(node)
    }
  }

  renderRight(){
    let rightArea = createChild('rx-right-area', this.domElement)
    return rightArea
  }

  draggingFromToolbox(rxNameId){
    this.commandProxy.draggingFromToolbox(rxNameId)
  }

  endFollowMouse(){
    this.drawer.toolbox.endFollowMouse()
  }

  focusNode(node){
    this.drawer.editNode(node)
  }

  unFocusNode(id){
    this.drawer.cancelEditNode(id)
  }

  commandsHistoryChanged(canUndo, canRedo){
    this.state.canUndo = canUndo
    this.state.canRedo = canRedo
  }
}
