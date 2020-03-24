import {RXComponent} from "../basic/rxcomponent"

export class RxCursor extends RXComponent{
  constructor(){
    super()
    this.cssClass('rx-cursor')
    this.cssClass('out')
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

  showInTop(node){
    this.node = node
    if(!node || !node.view.$dom) return
    console.log('show in top')
    return super.show()
  }

  showInRight(node){

  }

  showInBottom(node){

  }

  showInLeft(node){

  }

  showOutTop(node){

  }

  showOutRight(node){

  }

  showOutBottom(node){

  }

  showOutLeft(node){

  }

  showAsTextCursor(node){

  }

  show(node){
    this.node = node
    if(!node || !node.view.$dom) return
    this.followElement(node)
    //console.log('show Cursor')
    return super.show()
  }

  followElement(node){
    if(!node || !node.view || !node.view.$dom) return
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.x + 'px'
      this.$dom.style.top = rect.height/2 + 'px'
      //if(rect.y < 20){
      //  this.$dom.style.top = (rect.y + rect.height) + 'px'
      //}
      //else{
      //  this.$dom.style.top = (rect.y - 15 - offset) + 'px'
      //}

      this.$dom.style.width = rect.width + 'px'
    }
  }
}