import {RXComponent} from "../basic/rxcomponent"
import {ObjectState} from "../basic/object-state"

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

class BarButton extends RXComponent{
  constructor(title, callback){
    super()
    this.cssClass('mini-button')
    this.domAttr('title', title)  
    this.domOn('click', callback)
  }  
}

export class MiniEditbar extends RXComponent{
  constructor(){
    super()
    this.cssClass('mini-editbar')
    this.hide()

    this.domOn('mousedown', (event)=>{
      event.preventDefault()
    })
  

    this.pushChild(new BarButton('Bold', ()=>{
      })
      .cssClass('icon-button')
      .setInnerHTML('<b>B</b>')
    )
    this.pushChild(new BarButton('Italic', ()=>{
      })
      .cssClass('icon-button')
      .setInnerHTML('<i>I</i>')
    )
    this.pushChild(new BarButton('Underline', ()=>{
      })
      .cssClass('icon-button')
      .setInnerHTML('<u>U</u>')
    )
    this.pushChild(new BarButton('Strike', ()=>{
      })
      .cssClass('icon-button')
      .setInnerHTML('<strike>S</strike>')
    )
    this.pushChild(new BarButton('Link', ()=>{
      })
      .cssClass('icon-button')
      .setInnerHTML('<span>⫘</span>')
    )
    this.pushChild(new BarButton('Bootstrap Styles', ()=>{
      })
      .cssClass('mini-styles')
      .setInnerHTML('Insert <span>▾</span>')
    )
  }

  show(followElement){
    if(!followElement) return
    this.followElement(followElement)
    return super.show()
  }

  followElement(domElement){
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