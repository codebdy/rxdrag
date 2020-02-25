import {RXEditor} from "../core/rxeditor"
import {CanvasState} from "../core/canvas-state"
import {Drawer} from "./drawer"
import {Toolbar} from "./toolbar"
import initEditor from "./init-editor"
import {IFrameCommandProxy} from "./iframe-command-porxy"
import {EditorState} from "./editor-state"
import {RXComponent} from "../basic/rxcomponent"
import {RXModel} from "./controls/model"
import {ThemeModel} from "./theme-model"
import {Workspace} from './workspace'
import {themes} from "./themes"


var JSZip = require("jszip")
var FileSaver = require('file-saver');
//var zip = new JSZip()


export class RXEditorFM{
  constructor(){
    //initEditor()
    this.state = new EditorState
    this.canvasState = new CanvasState
    this.itemRxNameIds = []
    this.currentTheme = themes.agency
  }

  assemble(rxNameId){
    this.itemRxNameIds.push(rxNameId)
  }

  hangOn(id, config){
    this.domElement = document.getElementById(id)
    this.domElement.classList.add('rx-editor')
    let toolbar = new Toolbar(this, true)
    let aboutModel = new RXModel()
                     .setContent(`<div style="padding:20px;">
                                    <p>欢迎使用RXEditor！</p>
                                    <p>尚未正式发布，仅供测试</p>
                                    <p>Github: <a href="https://github.com/vularsoft/rxeditor" target="_blank">https://github.com/vularsoft/rxeditor</a></p>
                                  </div>
                                 `
                      )

    let themeModel = new ThemeModel()

    this.workspace = new Workspace(config)
    new RXComponent().cssClass('rx-left-area')
                     .pushChild(toolbar)
                     .pushChild(this.workspace)
                     .pushChild(aboutModel)
                     .pushChild(themeModel)
                     .render(this.domElement)
    this.workspace.loadTheme(this.currentTheme)
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

    themeModel.onThemeSelected = (themeName)=>{
      let theme = themes[themeName]
      if(theme !== this.currentTheme){
        this.currentTheme = theme
        this.workspace.loadTheme(this.currentTheme)
      }
    }

    this.canvasState.watch('changed', (state)=>{
      this.commandProxy.changeCanvasState(state)
    })

    toolbar.redo = ()=>{
      this.commandProxy.redo()
    }
    toolbar.undo = ()=>{
      this.commandProxy.undo()
    }

    toolbar.download = ()=>{
      this.commandProxy.download()
    }

    toolbar.clearCanvas = ()=>{
      if(confirm("Are you sure to clear canvas?")){
        this.commandProxy.clearCanvas()
      }
    }

    toolbar.about = ()=>{
      aboutModel.show()
    }

    toolbar.theme = ()=>{
      themeModel.show()
    }
  }

  onRxEditorReady(){
    this.drawer.render(this.domElement)
    //请求所有可装配元素
    //for(var i in this.itemRxNameIds){
    this.commandProxy.requestAssemble(
      this.currentTheme, 
      this.drawer.toolbox.assembleToolbox, //装配工具栏
      this.drawer.nodeTree.assembleTreeView//装配TreeView
    )
    //}

    //跟踪工具拖拽
    this.drawer.toolbox.on('draggingFromToolbox', (rxNameId)=>{
      this.draggingFromToolbox(rxNameId)
    })

    this.drawer.toolbox.on('endDragFromToolbox', (rxNameId)=>{
        if(this.commandProxy){
        this.commandProxy.endDragFromToolbox()
      }
    })

    this.drawer.nodeTree.onNodeClick = (node)=>{
      this.commandProxy.focusNodeFromSchell(node)
    }

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
    this.drawer.nodeTree.focusNode(node)
  }

  unFocusNode(id){
    this.drawer.cancelEditNode(id)
    this.drawer.nodeTree.unFocusNode(id)
  }

  commandExcuted(canUndo, canRedo, commandSchema){
    this.state.canUndo = canUndo
    this.state.canRedo = canRedo
    this.drawer.nodeTree.excuteCommand(commandSchema)
  }

  saveCodeFiles(innerHTML, json){
    var zip = new JSZip();
    zip.file("index.html", innerHTML);
    zip.file("data.json", JSON.stringify(json));
    //var img = zip.folder("images");
    //img.file("smile.gif", imgData, {base64: true});
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "RX-HTML.zip");
    });      
  }
}
