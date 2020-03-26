import {Node} from "../node"
import {TextNode} from "./text-node"

export class RXNode extends Node{
  constructor() {
    super()

  }


  clone(){
    let copy = super.clone()
    copy.meta = JSON.parse(JSON.stringify(this.meta))
    //copy.schema = JSON.parse(JSON.stringify(this.schema))
    //copy.meta.tag = this.meta.tag
    //copy.meta.innerHTML = this.meta.innerHTML

    //this.addons.forEach((addon)=>{
    //  addon.copyMeta(this.meta, copy.meta)
    //})

    return copy
  }

  //edit(){
  //  this.meta.attributes['contenteditable'] = true
  //  this.render()
  //  this.view.$dom.focus()
  //}

  toViewModel(){
    let model = super.toViewModel()
    this.baseMetaToModel(model)
    this.metaToModel(model)

    if(rxEditor.state.showEditMargin && this.rule.editMarginStyle){
      model.styles.margin = this.rule.editMarginStyle.margin
      model.styles.padding = this.rule.editMarginStyle.padding
    }

    //添加for后，编辑时无法选中
    if(model.attributes.for){
      model.attributes.for = ''
    }

    if(this.meta.innerHTML){
      //console.log('innerHTML', this.meta.innerHTML)
      model.innerHTML = this.meta.innerHTML
    }

    return model
  }

  toPreviewModel(){
    let model = super.toPreviewModel()
    this.baseMetaToModel(model)
    this.metaToModel(model)
    return model
  }

  baseMetaToModel(model){
    let meta = this.meta
    model.tag = meta.tag
    model.innerHTML = meta.innerHTML
    model.classList.push.apply(model.classList, meta.classList)
    Object.assign(model.styles, meta.styles)
    Object.assign(model.attributes, meta.attributes)
  }

  metaToModel(model){
  }

  setTag(tag){
    return this.setField('tag', tag)
  }

  addClass(className){
    if(!className){
      return this
    }
    this.meta.classList.push(className)
    return this
  }

  setAttribute(attrName, value){
    this.meta.attributes[attrName] = value
    return this
  }

  changeTextnodeToCharNode(){
    let children = []
    this.children.forEach(child=>{
      if(child.isTextNode){
        children.push.apply(children, child.charNodes())
        this.isCharState = true
      }
      else{
        children.push(child)
      }
    })

    this.children = children
    this.render()
  }

  changeCharNodeToTextNode(){
    let children = []
    var textNode = null
    this.children.forEach(child=>{
      if(child.isCharNode){
        let prev = child.previousSbiling()
        if(!prev || !prev.isCharNode){
          textNode = new TextNode('')
          textNode.parent = this
          children.push(textNode)
        }

        textNode.text += child.char
      }
      else{
        children.push(child)
      }
    })    
    this.children = children
    this.render()
    this.isCharState = false
  }

  clearCharNodes(){
    if(this.isCharState){
      this.changeCharNodeToTextNode()
    }
    super.clearCharNodes()
  }

}