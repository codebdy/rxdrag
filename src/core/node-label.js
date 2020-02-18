import {RXComponent} from "../basic/rxcomponent"

export class NodeLabel extends RXComponent{
  constructor(){
    super()
    this.cssClass('node-label')
    this.domAttr('title', 'Can be draged')
    this.hide()
  }

  show(label, followElement, offset){
    super.setInnerHTML(label)
    this.followElement(followElement, offset)
    return super.show()
  }

  followElement(domElement, offset){
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.x + 'px'
      if(rect.y < 20){
        this.$dom.style.top = (rect.y + rect.height + offset) + 'px'
      }
      else{
        this.$dom.style.top = (rect.y - 15 - offset) + 'px'
      }
    }
  }
}