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

    this.duplicateBtn = new ToolbarButton('Duplicate', 'fa-copy', 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.duplicate(event)
      }
    })

    this.pushChild(new ToolbarButton('Focus Parent', 'fa-arrow-up', 'click' , ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.up(event)
      }
    }))
    this.pushChild(new ToolbarButton('Move', 'fa-arrows','mousedown', (event)=>{
        if(rxEditor.focusedNode){
          rxEditor.focusedNode.begindragIcon(event)
        }
      })
      .cssStyle('cursor', 'move')
    )
    this.pushChild(this.duplicateBtn)
    /*this.pushChild(new ToolbarButton('Edit', 'fa-edit', 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.edit(event)
      }
    }))*/
    this.pushChild(new ToolbarButton('Delete', 'fa-trash-o', 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.delete(event)
      }
    }))

    document.addEventListener('scroll', (event)=>{
      this.refreshPosition()
    })
    window.addEventListener('resize', (event)=>{
      this.refreshPosition()
    })
  }

  refreshPosition(){
    this.followElement(this.node)
  }

  show(node){
    this.node = node
    if(!node || !node.$dom) return
    this.followElement(node)
    if(this.node.forbidDuplicate){
      this.duplicateBtn.hide()
    }
    else{
      this.duplicateBtn.show()
    }
    return super.show()
  }

  followElement(node){
    if(!node || !node.$dom) return
    let domElement = node.$dom
    let rect = domElement.getBoundingClientRect()
    let offsetX = this.node.forbidDuplicate ? 28 : 0
    if(this.$dom){
      let x = (rect.x + rect.width - 99)
      x = x < 0 ? 0 : x
      this.$dom.style.left = x + offsetX + 'px'
      if(rect.y < 26){
        this.$dom.style.top = (rect.y + rect.height) + 'px'
      }
      else{
        this.$dom.style.top = (rect.y - 26) + 'px'
      }
    }
  }
}