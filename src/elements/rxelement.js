import {Node} from "../core/node"
//import {utilColorSchema, utilColorMeta, utilColorCopyTo, utilColorToViewModel} from "./schemas/utilities/color"
import {utilBorderSchema, utilBorderMeta, utilBorderCopyTo, utilBorderToViewModel} from "./schemas/utilities/border"
import marginAuto from "./schemas/utilities/margin/margin-auto"
import {utilMarginSchema, utilMarginMeta} from "./schemas/utilities/margin"
//import {utilPaddingSchema, utilPaddingMeta} from "./schemas/utilities/padding"
import utilWidth from "./schemas/utilities/sizing/width"
import utilHeight from "./schemas/utilities/sizing/height"
import responsiveMeta from "./schemas/responsive"
import {utilDisplaySchema, utilDisplayToViewModel} from "./schemas/utilities/display"

export class RXElement extends Node{
  constructor() {
    super()

    this.addons = []

    this.addedFeilds = []
    this.addedFieldGroups = []
    //基础数据，持久化也是这部分数据
    this.$meta = {
      tag:'div',
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
      'decorations':{
        label:'Decorations',
      },
    }

    this.addToGroup = (groupName)=>{
      this.$schema.groups[groupName] = this.groups[groupName]
    }

  }


  /*addColor(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.utilColor = Object.assign({}, utilColorMeta)
    this.$schema.fields.utilColor = Object.assign({}, utilColorSchema)
  }*/

  addBorder(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.utilBorder = Object.assign({}, utilBorderMeta)
    this.$schema.fields.utilBorder = Object.assign({}, utilBorderSchema)
  }


  addMarginAuto(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.marginAuto = Object.assign({}, responsiveMeta)

    this.$schema.fields.marginAuto = Object.assign({}, marginAuto)

    this.addedFeilds.push('marginAuto')
  }

//---
  /*addPadding(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.utilPadding = Object.assign({}, utilPaddingMeta)
    this.$schema.fields.utilPadding = Object.assign({}, utilPaddingSchema)
    this.addedFieldGroups.push('utilPadding')
  }*/

  addMargin(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.utilMargin = Object.assign({}, utilMarginMeta)

    this.$schema.fields.utilMargin = Object.assign({}, utilMarginSchema)
    this.addedFieldGroups.push('utilMargin')
  }

  addWidth(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.utilWidth = ''
    this.$schema.fields.utilWidth = utilWidth
  }

  addHeight(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.utilHeight = ''
    this.$schema.fields.utilHeight = utilHeight
  }

  addClearfix(){
    this.$schema.fields.utilClearfix = {
      label:'Clearfix',
      widget:'OpSwitch',
      required:true,
      group:'utilities',
      onValue:'clearfix',
      offValue:'',
      defaultValue:'',
    }
    this.$meta.utilClearfix = ''
  }

  addDisplay(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.utilDisplay = Object.assign({}, responsiveMeta)
    this.$schema.fields.utilDisplay = Object.assign({}, utilDisplaySchema)

  }

  clone(){
    let copy = super.clone()
    copy.$meta.tag = this.$meta.tag

    for(var fieldName in this.addedFeilds){
      this.copyMetaTo(this.$meta[fieldName], copy.$meta[fieldName])
    }

    this.addedFieldGroups.forEach((fieldGroupName)=>{
      for(var fieldName in this.$meta[fieldGroupName]){
      this.copyMetaTo(this.$meta[fieldGroupName][fieldName], copy.$meta[fieldGroupName][fieldName])
      }
    })

    copy.$meta.utilWidth = this.$meta.utilWidth
    copy.$meta.utilHeight = this.$meta.utilHeight

    //utilColorCopyTo(this, copy)
    utilBorderCopyTo(this, copy)
    copy.$meta.utilClearfix = this.$meta.utilClearfix

    this.copyMetaTo(this.$meta['utilDisplay'], copy.$meta['utilDisplay'])

    this.addons.forEach((addon)=>{
      addon.copyMeta(this, copy)
    })


    return copy
  }

  copyMetaTo(from, to){
    for(var name in from){
      to[name] = from[name]
    }
  }
 
  toViewModel(){
    let model = super.toViewModel()
    model.name = this.$meta.tag

    this.addedFeilds.forEach((fieldName)=>{
      this.metaFieldToViewModel(model, this.$meta[fieldName])
    })


    this.addedFieldGroups.forEach((fieldGroupName)=>{
      for(var fieldName in this.$meta[fieldGroupName]){
      this.metaFieldToViewModel(model, this.$meta[fieldGroupName][fieldName])
      }
    })

    model.classList.add(this.$meta.utilWidth)
    model.classList.add(this.$meta.utilHeight)

    //utilColorToViewModel(model, this.$meta.utilColor)
    utilBorderToViewModel(model, this.$meta.utilBorder)
    model.classList.add(this.$meta.utilClearfix)

    //this.metaFieldToViewModel(model, this.$meta['utilDisplay'])
    //以特殊形式显示隐藏元素
    utilDisplayToViewModel(model, this.$meta.utilDisplay)

    this.addons.forEach((addon)=>{
      addon.toViewModel(model, this.$meta)
    })

    return model
  }
    //this.addonsCopy = []

  metaFieldToViewModel(model, metaFragment){
    for(var name in metaFragment){
      model.classList.add(metaFragment[name])
    }
  }

}