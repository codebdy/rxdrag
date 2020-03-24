import {RXComponent} from "../basic/rxcomponent"

export class RxCursor extends RXComponent{
  constructor(){
    super()
    this.cssClass('rx-cursor')
    this.cssClass('out')
    this.hide()
  }

  show(position, node){
    if(!node || !node.view.$dom) return
    this.classClasses()
    this.cssClass('rx-cursor')
    this.cssClass(position)
    this.node = node
    if(position === 'in-top'){
      this.inTop(node)
    }

    if(position === 'in-right'){
      this.inRight(node)
    }

    if(position === 'in-bottom'){
      this.inBottom(node)
    }

    if(position === 'in-left'){
      this.inLeft(node)
    }
    //console.log('show Cursor')
    return super.show()
  }

  inTop(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.left + 'px'
      this.$dom.style.top = rect.top + 'px'
      this.$dom.style.width = rect.width + 'px'
      this.$dom.style.height = '4px'
    }
  }

  inRight(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = "auto"
      this.$dom.style.right = 0 + 'px'
      this.$dom.style.top = rect.top + 'px'
      this.$dom.style.width = '4px'
      this.$dom.style.height = rect.height + 'px'
    }
  }

  inBottom(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.x + 'px'
      this.$dom.style.top = 'auto'
      this.$dom.style.bottom = 0 + 'px'
      this.$dom.style.width = rect.width + 'px'
      this.$dom.style.height = '4px'
    }
  }

  inLeft(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = "0" + 'px'
      this.$dom.style.right = 'auto'
      this.$dom.style.top = rect.top + 'px'
      this.$dom.style.width = '4px'
      this.$dom.style.height = rect.height + 'px'
    }
  }

  followElement(node){
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