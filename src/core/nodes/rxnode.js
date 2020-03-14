import {Node} from "../node"

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

 
  toViewModel(){
    let model = super.toViewModel()
    this.baseMetaToModel(model)
    this.metaToModel(model)

    if(this.meta.generalTextfield === 'contentEditable'){
      parkMiniEditbar(model, this)
    }
    else if(rxEditor.state.showEditMargin){
      model.styles.padding = this.editMarginStyle.padding
    }

    if(rxEditor.state.showEditMargin){
      model.styles.margin = this.editMarginStyle.margin
    }

    if(!this.meta.innerHTML && this.children.length === 0){
      model.styles.padding = this.editMarginStyle.padding
    }

    //添加for后，编辑时无法选中
    if(model.attributes.for){
      model.attributes.for = ''
    }

    if(this.meta.innerHTML){
      console.log('innerHTML', this.meta.innerHTML)
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
    model.name = meta.tag
    model.innerHTML = meta.innerHTML
    model.classList.push.apply(model.classList, meta.classList)
    Object.assign(model.styles, meta.styles)
    Object.assign(model.attributes, meta.attributes)

    //this.addons.forEach((addon)=>{
    //  addon.metaToModel(model, meta)
    //})
  }

  metaToModel(model){
  }

  setInnerHTML(innerHTML){
    this.meta.innerHTML = innerHTML
    return this
  }

  setField(fieldName, value){
    this.meta[fieldName] = value
    return this
  }

  getField(fieldName){
    return this.meta[fieldName]
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

  setEditPadding(padding){
    this.editMarginStyle.padding = padding
    return this
  }

}