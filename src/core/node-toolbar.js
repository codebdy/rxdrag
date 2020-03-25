import {RXComponent} from "../basic/rxcomponent"

class SvgButton extends RXComponent{
  constructor(title, svg, on, callback){
    super()
    this.cssClass('rx-button')
    this.domAttr('title', title)  
    this.innerHTML = svg
    this.domOn(on, callback)
  }  
}

var svgArrowUp = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" class="svg-inline--fa fa-arrow-up fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>`

var svgMove = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrows-alt" class="svg-inline--fa fa-arrows-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z"></path></svg>`

var svgClone = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clone" class="svg-inline--fa fa-clone fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>`

var svgRemove = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>`

export class NodeToolbar extends RXComponent{
  constructor(){
    super()
    this.cssClass('node-toolbar')
    this.hide()

    this.duplicateBtn = new SvgButton('Duplicate', svgClone, 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.duplicate(event)
      }
    })

    this.pushChild(new SvgButton('Focus Parent', svgArrowUp, 'click' , ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.up(event)
      }
    }))
    this.pushChild(new SvgButton('Move', svgMove,'mousedown', (event)=>{
        if(rxEditor.focusedNode){
          rxEditor.focusedNode.begindragIcon(event)
        }
      })
      //.cssStyle('cursor', 'move')
    )
    this.pushChild(this.duplicateBtn)
    /*this.pushChild(new ToolbarButton('Edit', 'fa-edit', 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.edit(event)
      }
    }))*/
    this.pushChild(new SvgButton('Delete', svgRemove, 'click', ()=>{
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
    if(!node || !node.view.$dom) return
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
    if(!node || !node.view || !node.view.$dom) return
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    let offsetX = this.node.forbidDuplicate ? 28 : 0
    if(this.$dom){
      let x = (rect.x + rect.width - 95)
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