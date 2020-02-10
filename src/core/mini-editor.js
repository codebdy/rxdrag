import {ObjectState} from "../basic/object-state"


function createChild(className, parentDomNode){
    let child = document.createElement('div')
    child.classList.add(className)
    parentDomNode.appendChild(child)
    return child
  }

class EditorState extends ObjectState{
  constructor(){
    super()
    this.__bold = false
    this.__italic = false
    this.__underline = false
    this.__strikethrough = false
  }

  get bold(){
    return this.__bold
  }

  set bold(bold){
    if(this.__bold == bold){return} 
    this.__bold = bold
    this.distributeEvent('bold')
  }

  get italic(){
    return this.__italic
  }

  set italic(italic){
    if(this.__italic == italic){return} 
    this.__italic = italic
    this.distributeEvent('italic')
  }

  get underline(){
    return this.__underline
  }

  set underline(underline){
    if(this.__underline == underline){return} 
    this.__underline = underline
    this.distributeEvent('underline')
  }
  get strikethrough(){
    return this.__strikethrough
  }

  set strikethrough(strikethrough){
    if(this.__strikethrough == strikethrough){return} 
    this.__strikethrough = strikethrough
    this.distributeEvent('strikethrough')
  }


}

export class MiniEditor{
  constructor(){
    this.state = new EditorState
  }

  hangOn(domElement){
    console.log('enter mini editor')
    this.domElement = domElement

    domElement.classList.add('mini-editor')

    let canvas = createChild('mini-editor-canvas',domElement)
    this.canvas = canvas

    canvas.innerHTML ="欢迎使用 Mini Editor "

    this.canvas.onkeydown = (event)=>{
      if (event.keyCode === 13) {
        event.preventDefault()
        return false
      }
    }

    domElement.ondblclick = ()=>{
      canvas.contentEditable = true
      canvas.focus()
      this.showToolbar()

    }

    canvas.onblur = ()=>{
      canvas.contentEditable = false
      this.hideToolbar()
    }

    document.addEventListener("selectionchange", ()=>{
      this.refreshBoldBtn()
      this.refreshItalicBtn()
      //let selection = window.getSelection()
      //var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();

      //console.log(window.getSelection())
      //console.log(window.getSelection().focusNode.parentNode.nodeName,
      //  window.getSelection().focusNode.parentElement.nodeName)
      //console.log(range.commonAncestorContainer.nodeName)

     /* var node,selection;
      if (window.getSelection) {
          selection = getSelection();
          node = selection.anchorNode;
      }
      if (!node && document.selection) {
          selection = document.selection
          var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
          node = range.commonAncestorContainer ? range.commonAncestorContainer :
          range.parentElement ? range.parentElement() : range.item(0);
      }
      if (node) {
          var item =  (node.nodeName == "#text" ? node.parentNode : node);
   
           console.log("nodeName:"+item.nodeName);
           console.log("innerHTML:"+item.innerHTML);
           console.log("font-size:"+item.style["font-size"]);
           console.log("color:"+item.getAttribute("color"));
           console.log("queryCommandState1 bold:"+document.queryCommandState('bold'));
      }*/


    });

  }

  showToolbar(){
    this.toolbar = createChild('mini-editor-toolbar',this.domElement)


    //this.toolbar.innerHTML = `
    //  <div class="sp-dropdown-list sp-headers" title="Bootstrap Style"> 
    //  Normal <span>▾</span>
    //  </div>
    //`
    this.createBoldBtn()
    this.createItalicBtn()

    let underlineBtn = createChild('sp-button',this.toolbar)
    underlineBtn.classList.add('icon-button')
    underlineBtn.innerHTML = '<u>U</u>'

    let strikethroughBtn = createChild('sp-button',this.toolbar)
    strikethroughBtn.classList.add('icon-button')
    strikethroughBtn.innerHTML = '<strike>S</strike>'

    let linkBtn = createChild('sp-button',this.toolbar)
    linkBtn.classList.add('icon-button')
    linkBtn.innerHTML = '<span>⫘</span>'

    let styleBtn = createChild('sp-button',this.toolbar)
    styleBtn.classList.add('sp-styles')
    styleBtn.title = "Bootstrap Style"
    styleBtn.innerHTML = `Insert <span>▾</span>`//‹› <>≮≯

    styleBtn.onclick = (event)=>{
      console.log('style  s button click')
      document.execCommand('insertHTML', false, '<span style="color:red;">EX<span>');
       //console.log(document.queryCommandValue("formatBlock").length)
      //document.execCommand('formatBlock', false, '<h2>');
   }


    this.toolbar.onmousedown = (event)=>{
      console.log('mouse down')
      event.preventDefault()
    }
  }

  setHeading(heading)  {
    let formatTag  =  heading
    formatBlock  =  document.queryCommandValue("formatBlock");
    if(formatBlock.length > 0 && formatBlock.toLowerCase() === formatTag)  {
      document.execCommand('formatBlock',  false,  ``);
    }  
    else{
      document.execCommand('formatBlock',  false,  ``);

    }
  }

  createBoldBtn(){
    let boldBtn = createChild('sp-button',this.toolbar)
    this.boldBtn = boldBtn
    boldBtn.classList.add('icon-button')
    boldBtn.innerHTML = '<b>B</b>'

    boldBtn.onclick = (event)=>{
      document.execCommand('bold', false, null)
    }

    this.state.watch('bold', ()=>{
      if(this.state.bold){
        this.boldBtn.classList.add('active')
      }
      else{
        this.boldBtn.classList.remove('active')
      }
    })

  }

  refreshBoldBtn(){
    this.state.bold = document.queryCommandState('bold')
  }

  createItalicBtn(){
    let italicBtn = createChild('sp-button',this.toolbar)
    this.italicBtn = italicBtn
    italicBtn.classList.add('icon-button')
    italicBtn.innerHTML = '<i>I</i>'
    italicBtn.onclick = (event)=>{
      document.execCommand('italic', false, null)
      this.state.italic = !this.state.italic
    }

    this.state.watch('italic', ()=>{
      if(this.state.italic){
        this.italicBtn.classList.add('active')
      }
      else{
        this.italicBtn.classList.remove('active')
      }
    })

  }

  refreshItalicBtn(){
    this.state.italic = document.queryCommandState('italic')
  }


  hideToolbar(){
    this.toolbar.style.display = "none"
  }


}
