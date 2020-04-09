<template>
  <div class="html-page"
    :class="state.preview ? 'page-preview' : 'html-page'"
  >
    <div class="page-toolbar">
      <div class="left">
        <div class="icon-button big" 
          :class="{
            'active' : state.screenWidth === 'xl',
            'disabled' : viewCode
          }"
          @click="resizeScreen('xl')"
          title = "XL"
        >
          <i class="fas fa-tv"></i>
        </div>
        <div class="icon-button"
          :class="{
            'active' : state.screenWidth === 'lg',
            'disabled' : viewCode
          }"
          @click="resizeScreen('lg')"
          title = "LG"
        >
          <i class="fas fa-desktop"></i>
        </div>
        <div class="icon-button"
          :class="{
            'active' : state.screenWidth === 'md',
            'disabled' : viewCode
          }"
          @click="resizeScreen('md')"
          title = "MD"
        >
          <i class="fas fa-laptop"></i>
        </div>
        <div class="icon-button"
          :class="{
            'active' : state.screenWidth === 'sm',
            'disabled' : viewCode
          }"
          @click="resizeScreen('sm')"
          title = "SM"
        >
          <i class="fas fa-tablet-alt"></i>
        </div>
        <div class="icon-button"
          :class="{
            'active' : state.screenWidth === 'xs',
            'disabled' : viewCode
          }"
          @click="resizeScreen('xs')"
          title = "XS"
        >
          <i class="fas fa-mobile-alt"></i>
        </div>
      </div>
      <div class="center"></div>
      <div class="right">
        <div class="icon-button" 
          v-if="!state.preview"
          :class = "{
            'active' : state.showOutline,
            'disabled' : viewCode
          } "
          :title="$t('page-toolbar.outline')"
          @click="outlineClick">
          <i class="far fa-square"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :class = "{
            'active' : state.showMarginX,
            'disabled' : viewCode 
          }"
          :title="$t('page-toolbar.margin-x')"
          @click = "marginXClick"
        >
          <i class="fas fa-arrows-alt-h"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :class = "{
            'active' : state.showMarginY,
            'disabled' : viewCode 
          }"
          :title="$t('page-toolbar.margin-y')"
          @click = "marginYClick"
        >
          <i class="fas fa-arrows-alt-v"></i>
        </div>
        <div class="icon-button"
          :title="state.preview ? $t('page-toolbar.cancel-preview') : $t('page-toolbar.preview')"
          :class = "{
            'active' : state.preview,
            'disabled' : viewCode
          }"
          @click = "previewClick"
        >
          <i class="fas fa-eye"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.code')"
          :class = "viewCode ?'active' :'' "
          @click = "codeClick"
        >
          <i class="fas fa-code"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.undo')"
          :class = "{
            'disabled' : viewCode || !canUndo
          }"
          @click = "undoClick"
        >
          <i class="fas fa-undo"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.redo')"
          :class = "{
            'disabled' : viewCode || !canRedo
          }"
          @click = "redoClick"
        >
          <i class="fas fa-redo"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.clear-canvas')"
          :class = "{
            'disabled' : viewCode
          }"
          @click = "clearCanvasClick"
        >
          <i class="fas fa-trash-alt"></i>
        </div>
        <!--div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.settings')"
        >
          <i class="fas fa-cog"></i>
        </div-->
      </div>
    </div>
    <div class="page-content"
    >
      <!-- 需要动态设定高度，当内容有变化时设定 -->
      <div class="canvas"
        :style = "{width:width}"
        v-show = "!viewCode"
      >
        <iframe src="javascrip:0" 
          :style="{
            display:state.preview ? 'none' :'block'
          }"
          scrolling="no" 
          frame-border ="0"
          border = "0"
          allow-transparency = "no"
          :height="canvasHeight" 
          ref ="canvasFrame"
        ></iframe>

        <iframe src="javascrip:0" 
          :style="{
            display:state.preview ? 'block' :'none'
          }"
          scrolling="yes" 
          frame-border ="0"
          border = "0"
          allow-transparency = "no"
          ref ="previewFrame"
        ></iframe>
      </div>
      <textarea class="code-editor"
        v-show = "viewCode"
        v-model = "inputValue.code"
      ></textarea>
    </div>
  </div>
</template>

<script>
import {IFrameCommandProxy} from "./IFrameCommandProxy"
import {NodeTree} from "./NodeTree"
import {HtmlBeautify} from "../../basic/HtmlBeautify"

export default {
  name: 'HtmlPage',
  components:{
  },
  props:{
    value:{ default:()=>{return{}} },
    breakpoints : {
      default : ()=>{ 
        this.xs = '490'
        this.sm = '576'
        this.md = '768'
        this.lg = '992'
        this.xl = '1200'
        return this
      }
    }, 
  },
  data () {
    return {
      commandProxy : new IFrameCommandProxy(this._uid),
      canvasHeight : '100%',
      oldHtmlCode :'',
      nodeTree : new NodeTree,
      focusNode : null,
      state:{
        showOutline : true,
        showMarginX : false,
        showMarginY : false,
        screenWidth : 'md',
        preview : false,
      },
      viewCode : false,
      canUndo : false,
      canRedo : false,
    }
  },
  computed:{
    inputValue: {
        get:function() {
          return this.value;
        },
        set:function(val) {
          this.$emit('input', val);
        },
    },

    actived(){
      return this.inputValue === this.$store.state.activedFile
    },

    width(){
      if(this.state.preview && this.state.screenWidth === 'xl'){
        return "100%"
      }
      return this.breakpoints[this.state.screenWidth] + 'px'
    }
  },

  mounted () {
    this.pageId = this._uid
    this.commandProxy.serveForShell = this
    this.commandProxy.iframe = this.$refs.canvasFrame
    //$rxbus.$on('activedFile', this.onFileActived)
    $rxbus.$on('draggingFromToolbox', this.draggingFromToolbox)
    $rxbus.$on('shellChangedNode', this.nodeChanged)
    $rxbus.$on('canvasHeight', this.onCanvasHeight)
    $rxbus.$on('commandExcuted', this.onCommandExcuted)
    $rxbus.$on('focusNode', this.onFocusNode)
    $rxbus.$on('unFocusNode', this.onUnFocusNode)
    $rxbus.$on('nodeSelected', this.onNodeSelected)
    this.initFrame()
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keyup', this.onKeyup)
    window.addEventListener("message", this.receiveCanvasMessage)
    $rxbus.$on('duplicateNode', this.onDuplicateNode)
    $rxbus.$on('removeNode', this.onRemoveNode)
    $rxbus.$on('replyHtmlCode', this.onReplyHtmlCode)
    $rxbus.$on('nodeHtmlChanged', this.onNodeHtmlChanged)
    $rxbus.$on('codeFileChange', this.onCodeFileChange)

    this.emitShellState()

    this.loadHtmlFile()
  },

  destoryed () {
    //delete window.$editorBus
    $rxbus.$off('draggingFromToolbox', this.draggingFromToolbox)
    $rxbus.$off('shellChangedNode', this.nodeChanged)
    $rxbus.$off('canvasHeight', this.onCanvasHeight)
    $rxbus.$off('commandExcuted', this.onCommandExcuted)
    $rxbus.$off('focusNode', this.onFocusNode)
    $rxbus.$off('unFocusNode', this.onUnFocusNode)
    $rxbus.$off('nodeSelected', this.onNodeSelected)
    $rxbus.$off('duplicateNode', this.onDuplicateNode)
    $rxbus.$off('removeNode', this.onRemoveNode)
    $rxbus.$off('replyHtmlCode', this.onReplyHtmlCode)
    $rxbus.$off('nodeHtmlChanged', this.onNodeHtmlChanged)
    $rxbus.$off('codeFileChange', this.onCodeFileChange)

    window.removeEventListener("message", this.receiveCanvasMessage);
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keyup', this.onKeyup)
  },

  methods: {
    resizeScreen(size){
      this.state.screenWidth = size
      this.commandProxy.changeCanvasState(this.state)
      $rxbus.$emit('resizeScreen', this.state.screenWidth, this.pageId)
    },

    outlineClick(){
      this.state.showOutline = !this.state.showOutline
      this.commandProxy.changeCanvasState(this.state)
    },

    marginXClick(){
      this.state.showMarginX = !this.state.showMarginX
      this.commandProxy.changeCanvasState(this.state)
    },

    marginYClick(){
      this.state.showMarginY = !this.state.showMarginY
      this.commandProxy.changeCanvasState(this.state)
    },

    previewClick(){
      this.state.preview = !this.state.preview
      this.commandProxy.requestHtmlCode()

    },

    codeClick(){
      this.viewCode = !this.viewCode
      if(this.viewCode){
        this.commandProxy.requestHtmlCode()
      }
      else{
        if(this.oldHtmlCode != this.inputValue.code){
          this.commandProxy.loadHtml(this.inputValue.code)
        }
      }
    },

    undoClick(){
      this.commandProxy.undo()
    },

    redoClick(){
      this.commandProxy.redo()
    },

    clearCanvasClick(){
      this.commandProxy.clearCanvas()
    },


    draggingFromToolbox(item){
      if(this.actived){
        //console.log('send in HTMLPage', this.inputValue.title)
        this.commandProxy.draggingFromToolbox(item)
      }
    },

    onRxEditorReady(){
      //console.log(this._uid)
      this.commandProxy.changeCanvasState(this.state)
      if(!this.inputValue.code){
        $axios.get(this.inputValue.path)
        .then((res)=>{
          this.$set(this.inputValue, 'code', res.data)
          this.sentHtmlToCanvas()
        })
      }
      else{
        this.sentHtmlToCanvas()
      }
    },

    sentHtmlToCanvas(){
      this.commandProxy.loadHtml(this.inputValue.code)
      this.setInlineCssAndJs()
    },

    nodeChanged(node, pageId){
      if(pageId === this.pageId){
        this.commandProxy.nodeChanged(node)
      }
    },

    onCanvasHeight(height, pageId){
      if(pageId === this.pageId && !this.state.preview){
        this.canvasHeight = height + 'px'
      }
    },

    onMouseUp(){
      if(this.actived){
        this.commandProxy.endDragFromToolbox()
      }
    },

    onKeyup(event){
      if(event && event.keyCode === 27){ 
        this.state.preview = false
        this.commandProxy.changeCanvasState(this.state)
      }
    },

    onCommandExcuted(canUndo, canRedo, commandSchema, pageId){
      if(pageId !== this.pageId){
        return
      }

      this.canUndo = canUndo
      this.canRedo = canRedo
      this.nodeTree.excuteCommand(commandSchema)

      $rxbus.$emit('showNodeTree', this.nodeTree.children)
    },

    onFocusNode(node, pageId){
      if(pageId !== this.pageId){
        return
      }
      this.focusNode = node
      this.nodeTree.selectNode(node.id)
      $rxbus.$emit('showNodeTree', this.nodeTree.children)
      $rxbus.$emit('editNode', this.focusNode, this.pageId)
    },

    onUnFocusNode(id, pageId){
      if(pageId !== this.pageId){
        return
      }
      if(this.focusNode && this.focusNode.id === id){
        this.focusNode = null
      }
      this.nodeTree.unSelectNode(id)
      $rxbus.$emit('editNode', null)
    },

    onNodeSelected(node){
      if(this.actived){
        this.commandProxy.focusNodeFromShell(node)
      }
    },

    onDuplicateNode(id){
      if(this.actived){
        this.commandProxy.duplicateNodeFromShell(id)
      }
    },

    onRemoveNode(id){
      if(this.actived){
        this.commandProxy.removeNodeFromShell(id)
      }
    },

    onReplyHtmlCode(code){
      if(this.actived){
        let beautify = new HtmlBeautify(code, '  ')
        this.inputValue.code = beautify.result
        this.oldHtmlCode = code
        if(this.state.preview){
          this.writeToPreviewFrame(code)
        }
      }
    },

    onNodeHtmlChanged(html){
      if(this.focusNode && this.actived){
        this.commandProxy.loadHtml(html, this.focusNode.id)
      }
    },

    onCodeFileChange(file){
      this.commandProxy.setInlineFile(file)
    },

    loadHtmlFile(){
      if(this.inputValue.path){
        $axios.get(this.inputValue.path)
        .then((res)=>{
          this.$set(this.inputValue, 'code', res.data)
        })
      }
      else{
        this.$set(this.inputValue, 'code', '')
      }
    },

    setInlineCssAndJs(){
      this.$store.state.project.styles.forEach(file=>{
        if(!file.locked){
          this.commandProxy.setInlineFile(file)
        }
      })

      this.$store.state.project.javascript.forEach(file=>{
        if(!file.locked){
          this.commandProxy.setInlineFile(file)
        }
      })
    },

    initFrame(){
      let iframedocument =  this.$refs.canvasFrame.contentDocument;
      let iframeContent = this.$store.state.project.getCanvasHtml(this.$store, this.pageId)
      iframedocument.open();
      iframedocument.write(iframeContent);
      iframedocument.close();
    },

    writeToPreviewFrame(code){
      let iframedocument =  this.$refs.previewFrame.contentDocument;

      let iframeContent = this.$store.state.project.getPreviewHtml(this.$store, code)
      iframedocument.open();
      iframedocument.write(iframeContent);
      iframedocument.close();
    },

    emitShellState(){
      $rxbus.$emit('showNodeTree', this.nodeTree.children)
      $rxbus.$emit('editNode', this.focusNode, this.pageId)
      $rxbus.$emit('resizeScreen', this.state.screenWidth, this.pageId)
    }
  },

  watch:{
    actived(val){
      if(val){
        this.emitShellState()
      }
    }
  }
}
</script>

<style>
 .html-page{
    flex: 1;
    display: flex;
    flex-flow: column;
    height: 0;
  }

  .page-preview{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #272727;
    z-index: 1;
  }

  .page-content{
    flex: 1;
    height: 0;
    overflow: auto;
    display: block;
  }

  .canvas{
    margin:0 auto ; 
    transition: all 0.5s;
  }

  .canvas iframe{
    width: 100%;
    min-height:calc(100vh - 112px);
    border:0;
  }

  .page-preview .canvas iframe{
    height: calc(100vh - 40px)
  }

  .html-page .page-toolbar{
    height: 35px;
    background: #494c45;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .html-page .page-toolbar .left{
    margin-left:10px;
    display: flex;
    flex-flow: row;
  }

  .html-page .page-toolbar .right{
    margin-right:10px;
    display: flex;
    flex-flow: row;
  }

  .html-page .page-toolbar .icon-button{
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:1px;
    border-radius: 2px;
  }

  .html-page .page-toolbar .icon-button:hover{
    background: rgba(0,0,0,0.3);
  }

  .html-page .page-toolbar .icon-button.active{
    background: rgba(0,0,0,0.5);
  }

  .html-page .page-toolbar .icon-button.big i{
    font-size: 14px;
  }

  .html-page .page-toolbar .icon-button.disabled{
    pointer-events: none;
    position: relative;
  }

  .html-page .page-toolbar .icon-button.disabled::after{
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(73,76,69,0.7);
    z-index: 1;
  }

</style>