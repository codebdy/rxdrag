import {Node} from "../core/node"
import {RXArray} from "../basic/rxarray"
import parkMiniEditbar from "../core/park-mini-editbar"
import {addonClasses} from "./schemas/general/classes"
import {addonAttributes} from "./schemas/general/attributes"
import {addonGeneralTextfield} from "./schemas/general/textfield"

export class RXElement extends Node{
  constructor() {
    super()

    this.addons = []

    this.addedFeilds = []
    this.addedFieldGroups = []
    //基础数据，持久化也是这部分数据
    this.$meta = {
      tag : 'div',
      classList : [],
      styles : {},
      attributes : {},
    }
    
    //Schema 信息，用于构建Option编辑部件
    this.$schema = {
      fields:{}
    } 

    this.$schema.groups = {}

    this.groups = {
      'utilities':{
        label:'Bootstrap Utilities',
      },
      'generalOptions':{
        label:'General Options'
      },
      'typographyOptions':{
        label:'Typography Options'
      },
      'componentsOptions':{
        label:'Components',
      },
      'customizedOptions':{
        label:'Customized',
      },
    }

    this.addToGroup = (groupName)=>{
      this.$schema.groups[groupName] = this.groups[groupName]
    }

    addonGeneralTextfield(this)
    addonClasses(this)
    addonAttributes(this)
  }

  clone(){
    let copy = super.clone()
    copy.$meta = JSON.parse(JSON.stringify(this.$meta))
    //copy.$meta.tag = this.$meta.tag
    //copy.$meta.innerHTML = this.$meta.innerHTML

    this.addons.forEach((addon)=>{
      addon.copyMeta(this.$meta, copy.$meta)
    })

    return copy
  }

  /*copyMetaTo(from, to){
    for(var name in from){
      to[name] = from[name]
    }
  }*/
 
  toViewModel(){
    let model = super.toViewModel()
    this.baseMetaToModel(model)
    this.metaToModel(model)

    if(this.$meta.generalTextfield === 'contentEditable'){
      parkMiniEditbar(model, this)
      model.styles.padding = ''
    }
    else{
      model.styles.padding = this.editMarginStyle.padding
    }

    return model
  }

  isTextfield(){
    if(this.$meta.generalTextfield === 'contentEditable'){
      return true
    }
  }

  toPreviewModel(){
    let model = super.toPreviewModel()
    this.baseMetaToModel(model)
    this.metaToModel(model)
    return model
  }

  baseMetaToModel(model){
    let meta = this.$meta
    model.name = meta.tag
    model.innerHTML = meta.innerHTML
    model.classList.push.apply(model.classList, meta.classList)
    Object.assign(model.styles, meta.styles)
    Object.assign(model.attributes, meta.attributes)

    this.addons.forEach((addon)=>{
      addon.metaToModel(model, meta)
    })
  }

  metaToModel(model){
  }

  setInnerHTML(innerHTML){
    this.$meta.innerHTML = innerHTML
    return this
  }

  setField(fieldName, value){
    this.$meta[fieldName] = value
    return this
  }

  addClass(className){
    this.$meta.classList.push(className)
    return this
  }

  setAttribute(attrName, value){
    this.$meta.attributes[attrName] = value
    return this
  }

  setEditPadding(padding){
    this.editMarginStyle.padding = padding
    return this
  }

  becomeToTextfield(){
    this.setField('generalTextfield', 'contentEditable')
    return this
  }



}