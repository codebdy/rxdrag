import {RXComponent} from "../basic/rxcomponent"

export class NodeLabel extends RXComponent{
  constructor(){
    super()
    this.cssClass('node-label')
    this.domAttr('title', $t('can-be-draged'))
    this.hide()
    document.addEventListener('scroll', (event)=>{
      this.refreshPosition()
    })
    window.addEventListener('resize', (event)=>{
      this.refreshPosition()
    })
  }

  refreshPosition(){
    this.followElement(this.node, this.offset)
  }

  show(label, node, offset){
    this.node = node
    this.offset = offset
    if(!node || !node.view.$dom) return
    super.setInnerHTML(label)
    this.followElement(node, offset)
    return super.show()
  }

  followElement(node, offset){
    if(!node || !node.view || !node.view.$dom) return
    let domElement = node.view.$dom
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