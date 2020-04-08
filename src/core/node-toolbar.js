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

var svgEdit = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>`

var svgClone = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clone" class="svg-inline--fa fa-clone fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>`

var svgRemove = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>`

export class NodeToolbar extends RXComponent{
  constructor(){
    super()
    this.cssClass('node-toolbar')
    this.hide()

    this.duplicateBtn = new SvgButton($t('duplicate'), svgClone, 'click', ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.duplicate(event)
      }
    })

    this.pushChild(new SvgButton($t('focus-parent'), svgArrowUp, 'click' , ()=>{
      if(rxEditor.focusedNode){
        rxEditor.focusedNode.up(event)
      }
    }))
    this.pushChild(new SvgButton($t('move'), svgMove,'mousedown', (event)=>{
        if(rxEditor.focusedNode){
          rxEditor.focusedNode.begindragIcon(event)
        }
      })
      //.cssStyle('cursor', 'move')
    )
    this.editButton = new SvgButton($t('edit'), svgEdit,'mousedown', (event)=>{
      rxEditor.focusedNode.changeToState('editState')
    })

    this.editButton.domOn('mouseup',(event)=>{
      //move cusor to end
      let el = rxEditor.focusedNode.view.$dom
      let sel = window.getSelection();
      if(el.childNodes.length > 0){
        sel.collapse(el, 1);
      }
      el.focus();      
    })
    this.pushChild(this.editButton)
    this.pushChild(this.duplicateBtn)
    this.pushChild(new SvgButton($t('delete'), svgRemove, 'click', ()=>{
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
    if(this.node.rule.editable){
      this.editButton.show()
    }
    else{
      this.editButton.hide()
    }
    //if(this.node.forbidDuplicate){
    //  this.duplicateBtn.hide()
    //}
    //else{
    //  this.duplicateBtn.show()
    //}
    return super.show()
  }

  followElement(node){
    if(!node || !node.view || !node.view.$dom) return
    let domElement = node.view.$dom
    let rect = domElement.getBoundingClientRect()
    let offsetX = this.node.rule.editable ? 0 : 25
    if(this.$dom){
      let x = (rect.x + rect.width - 120)
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