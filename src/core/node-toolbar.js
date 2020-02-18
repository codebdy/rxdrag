import {RXComponent} from "../basic/rxcomponent"

class ToolbarButton extends RXComponent{
  constructor(title, iconName, on){
    super()
    this.cssClass('rx-button')
    this.domAttr('title', title)  
    this.innerHTML = `<i class="fa ${iconName}"></i>`
    this.domOn(on)
  }  
}

export class NodeToolbar extends RXComponent{
  constructor(){
    super()
    this.cssClass('node-toolbar')
    this.hide()

    this.pushChild(new ToolbarButton('Focus Parent', 'fa-arrow-up', ()=>{}))
    this.pushChild(new ToolbarButton('Move', 'fa-arrows', ()=>{}))
    this.pushChild(new ToolbarButton('Duplicate', 'fa-copy', ()=>{}))
    this.pushChild(new ToolbarButton('Edit', 'fa-edit', ()=>{}))
    this.pushChild(new ToolbarButton('Delete', 'fa-trash-o', ()=>{}))
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