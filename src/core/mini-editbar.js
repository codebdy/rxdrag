import {RXComponent} from "../basic/rxcomponent"
import {ObjectState} from "../basic/object-state"

class EditorState extends ObjectState{
  constructor(){
    super()
    this.__bold = false
    this.__italic = false
    this.__underline = false
    this.__strikeThrough = false
    this.__isLink = false
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
  get strikeThrough(){
    return this.__strikeThrough
  }

  set strikeThrough(strikeThrough){
    if(this.__strikeThrough == strikeThrough){return} 
    this.__strikeThrough = strikeThrough
    this.distributeEvent('strikeThrough')
  }

  get isLink(){
    return this.__isLink
  }

  set isLink(isLink){
    if(this.__isLink == isLink){return} 
    this.__isLink = isLink
    this.distributeEvent('isLink')
  }

}

class BarButton extends RXComponent{
  constructor(title, callback){
    super()
    this.cssClass('mini-button')
    this.domAttr('title', title)  
    this.domOn('click', callback)
  }  
}

const isLink = () => {
  if (window.getSelection().toString !== '') {
    let selection = window.getSelection()
    selection = selection.rangeCount > 0 ? selection.getRangeAt(0) :''
    if (selection) {
      if (selection.startContainer.parentNode.tagName === 'A'
      || selection.endContainer.parentNode.tagName === 'A') {
        return true
      } else { return false }
    } else { return false }
  }
}


export class MiniEditbar extends RXComponent{
  constructor(){
    super()
    this.cssClass('mini-editbar')
    this.hide()
    this.state = new EditorState

    this.domOn('mousedown', (event)=>{
      event.preventDefault()
    })
  
    let boldBtn = new BarButton('Bold', ()=>{
        document.execCommand('bold', false, null)
        this.updateButtonsState()
      })
      .cssClass('icon-button')
      .setInnerHTML('<b>B</b>')

    this.pushChild(boldBtn)

    let italicBtn = new BarButton('Italic', ()=>{
        document.execCommand('italic', false, null)
        this.state.italic = !this.state.italic
      })
      .cssClass('icon-button')
      .setInnerHTML('<i>I</i>')
    this.pushChild( italicBtn )

    let underlineBtn = new BarButton('Underline', ()=>{
        document.execCommand('underline', false, null)
        this.updateButtonsState()
      })
      .cssClass('icon-button')
      .setInnerHTML('<u>U</u>')
    this.pushChild( underlineBtn )

    let strikeBtn = new BarButton('Strike', ()=>{
        document.execCommand('strikeThrough', false, null)
        this.updateButtonsState()
      })
      .cssClass('icon-button')
      .setInnerHTML('<strike>S</strike>')
    this.pushChild( strikeBtn )

    let linkBtn = new BarButton('Link', ()=>{
        if(this.state.isLink){
          document.execCommand('unlink', false, null)
        }
        else{
          document.execCommand('createLink', false, '#')
        }
        this.updateButtonsState()
      })
      .cssClass('icon-button')
      .setInnerHTML('<div style="transform:rotate(45deg)">⫘</div>')
    this.pushChild( linkBtn )

    document.onpaste = (event)=>{
      let plainText  =  event.clipboardData.getData('text/plain').replace(/[\r\n]/g,"<br>")
      document.execCommand('insertHTML', false, plainText)
      return false
    }

    document.addEventListener('keydown',(event)=>{
      if (event.keyCode === 13) {
        document.execCommand('insertHTML', false, '<br>')
        event.preventDefault()
        return false
      }
    })

    /*let codeBtn = new BarButton('Switch Code Editor', ()=>{
        this.updateButtonsState()
      })
      .cssClass('icon-button')
      .setInnerHTML('<div"><></div>')
    this.pushChild( codeBtn )
    let btnInsert = new BarButton('Bootstrap Styles', ()=>{
      })
      .cssClass('mini-styles')
      .setInnerHTML('Insert <span>▾</span>')
    this.pushChild( btnInsert )*/

    this.watchOne('bold', boldBtn)
    this.watchOne('italic', italicBtn)
    this.watchOne('underline', underlineBtn)
    this.watchOne('strikeThrough', strikeBtn)
    this.watchOne('isLink', linkBtn)    
    document.addEventListener('scroll', (event)=>{
      this.followElement(this.domElement)
    })
    window.addEventListener('resize', (event)=>{
      this.followElement(this.domElement)
    })
  }

  watchOne(stateName, btn){
    this.state.watch(stateName, ()=>{
      if(this.state[stateName]){
        btn.cssClass('active')
      }
      else{
        btn.removeCssClass('active')
      }
    })
  }

  show(followElement){
    if(!followElement) return
    this.followElement(followElement)
    this.updateButtonsState()
    document.addEventListener("selectionchange", (event)=>{
      this.updateButtonsState()
    })
    return super.show()
  }

  hide(){
    document.removeEventListener("selectionchange", (event)=>{
      this.updateButtonsState()
    })
    return super.hide()
  }


  updateButtonsState(){
    if(!this.isShow()){
      return
    }
    this.state.bold = document.queryCommandState('bold')
    this.state.italic = document.queryCommandState('italic')
    this.state.underline = document.queryCommandState('underline')
    this.state.strikeThrough = document.queryCommandState('strikeThrough')
    this.state.isLink = isLink()
  }

  followElement(domElement){
    if(!domElement) return
    this.domElement = domElement
    let rect = domElement.getBoundingClientRect()
    let height = 32
    if(this.$dom){
      this.$dom.style.left = (rect.x -1)  + 'px'
      if(rect.y < height){
        this.$dom.style.top = (rect.y + rect.height) + 'px'
      }
      else{
        this.$dom.style.top = (rect.y - height) + 'px'
      }
    }
  }
}