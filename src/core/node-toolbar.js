import {RXComponent} from "../basic/rxcomponent"

class ToolbarButton extends RXComponent{
  constructor(title, iconName, on, callback){
    super()
    this.cssClass('rx-button')
    this.domAttr('title', title)  
    this.innerHTML = `<i class="fa ${iconName}"></i>`
    this.domOn(on, callback)
  }  
}

export class NodeToolbar extends RXComponent{
  constructor(){
    super()
    this.cssClass('node-toolbar')
    this.hide()

    this.pushChild(new ToolbarButton('Focus Parent', 'fa-arrow-up', 'click' , ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.up(event)
      }
    }))
    this.pushChild(new ToolbarButton('Move', 'fa-arrows','mousedown', (event)=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.begindragIcon(event)
      }
    }))
    this.pushChild(new ToolbarButton('Duplicate', 'fa-copy', 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.duplicate(event)
      }
    }))
    this.pushChild(new ToolbarButton('Edit', 'fa-edit', 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.edit(event)
      }
    }))
    this.pushChild(new ToolbarButton('Delete', 'fa-trash-o', 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.delete(event)
      }
    }))
  }

  show(followElement){
    this.followElement(followElement)
    return super.show()
  }

  followElement(domElement){
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = (rect.x + rect.width - 135) + 'px'
      if(rect.y < 26){
        this.$dom.style.top = (rect.y + rect.height + 2) + 'px'
      }
      else{
        this.$dom.style.top = (rect.y - 26) + 'px'
      }
    }
  }
}