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
  constructor(title, iconName, on, callback){
    super()
    this.cssClass('mini-button')
    this.domAttr('title', title)  
    this.innerHTML = `<i class="fa ${iconName}"></i>`
    this.domOn(on, callback)
  }  
}

export class MiniEditbar extends RXComponent{
  constructor(){
    super()
    this.cssClass('mini-editbar')
    this.hide()

    this.pushChild(new BarButton('Focus Parent', 'fa-arrow-up', 'click' , ()=>{
    }))
    this.pushChild(new BarButton('Move', 'fa-arrows','mousedown', (event)=>{
      }))
    this.pushChild(new BarButton('Duplicate', 'fa-copy', 'click', ()=>{
    }))
    this.pushChild(new BarButton('Delete', 'fa-trash-o', 'click', ()=>{
    }))
  }

  show(followElement){
    if(!followElement) return
    this.followElement(followElement)
    return super.show()
  }

  followElement(domElement){
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.x  + 'px'
      if(rect.y < 26){
        this.$dom.style.top = (rect.y + rect.height + 2) + 'px'
      }
      else{
        this.$dom.style.top = (rect.y - 26) + 'px'
      }
    }
  }
}