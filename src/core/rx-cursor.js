import {RXComponent} from "../basic/rxcomponent"

export class RxCursor extends RXComponent{
  constructor(){
    super()
    this.cssClass('rx-cursor')
    this.cssClass('out')
    this.hide()
  }

  hide(){
    this.position = ''
    this.node = null
    super.hide()
  }
  
  show(position, node){
    this.position = position
    this.node = node
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

    if(position === 'out-top'){
      this.outTop(node)
    }

    if(position === 'out-right'){
      this.outRight(node)
    }

    if(position === 'out-bottom'){
      this.outBottom(node)
    }

    if(position === 'out-left'){
      this.outLeft(node)
    }

    if(position === 'char-left'){
      this.charLeft(node)
    }

    if(position === 'char-right'){
      this.charRight(node)
    }

    return super.show()
  }

  outTop(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.left + 'px'
      this.$dom.style.top = (rect.top - 2) + 'px'
      this.$dom.style.width = rect.width + 'px'
      this.$dom.style.height = '4px'
    }
  }

  outRight(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = (rect.right -2) + 'px'
      this.$dom.style.right = "auto"
      this.$dom.style.top = rect.top + 'px'
      this.$dom.style.width = '4px'
      this.$dom.style.height = rect.height + 'px'
    }
  }

  outBottom(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.x + 'px'
      this.$dom.style.top = (rect.bottom - 2) + 'px'
      this.$dom.style.bottom = 'auto'
      this.$dom.style.width = rect.width + 'px'
      this.$dom.style.height = '4px'
    }
  }

  outLeft(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = (rect.left - 2) + 'px'
      this.$dom.style.right = 'auto'
      this.$dom.style.top = rect.top + 'px'
      this.$dom.style.width = '4px'
      this.$dom.style.height = rect.height + 'px'
    }
  }

  charRight(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = (rect.right -2) + 'px'
      this.$dom.style.right = "auto"
      this.$dom.style.top = rect.top + 'px'
      this.$dom.style.width = '4px'
      this.$dom.style.height = rect.height + 'px'
    }
  }

  charLeft(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = (rect.left - 2) + 'px'
      this.$dom.style.right = 'auto'
      this.$dom.style.top = rect.top + 'px'
      this.$dom.style.width = '4px'
      this.$dom.style.height = rect.height + 'px'
    }
  }

/**/
  inTop(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.left + 'px'
      this.$dom.style.top = (rect.top + 1) + 'px'
      this.$dom.style.width = rect.width + 'px'
      this.$dom.style.height = '4px'
    }
  }

  inRight(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = (rect.right -4) + 'px'
      this.$dom.style.right = "auto"
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
      this.$dom.style.top = (rect.bottom - 4) + 'px'
      this.$dom.style.bottom = 'auto'
      this.$dom.style.width = rect.width + 'px'
      this.$dom.style.height = '4px'
    }
  }

  inLeft(node){
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    if(this.$dom){
      this.$dom.style.left = rect.left + 'px'
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