import {Node} from "../core/node"
import marginAuto from "./schemas/margin/margin-auto"
import marginAll from "./schemas/margin/margin-all"
import marginH from "./schemas/margin/margin-h"
import marginV from "./schemas/margin/margin-v"
import marginTop from "./schemas/margin/margin-t"
import marginBottom from "./schemas/margin/margin-b"
import marginLeft from "./schemas/margin/margin-l"
import marginRight from "./schemas/margin/margin-r"

import paddingAll from "./schemas/padding/padding-all"
import paddingH from "./schemas/padding/padding-h"
import paddingV from "./schemas/padding/padding-v"
import paddingTop from "./schemas/padding/padding-t"
import paddingBottom from "./schemas/padding/padding-b"
import paddingLeft from "./schemas/padding/padding-l"
import paddingRight from "./schemas/padding/padding-r"

export class RXElement extends Node{
  constructor() {
    super()
    this.addedClassFeilds = []
    //基础数据，持久化也是这部分数据
    this.$meta = {
      tag:'div',
    }
    
    //Schema 信息，用于构建Option编辑部件
    this.$schema = {
      fields:{}
    } //备忘：Flexbox: flex container, flex item

    this.groups = {
      'margin':{
        label:'Margin',
      },
      'padding':{
        label:'Padding',
      },
    }
  }

  addMarginAuto(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.marginAuto = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$schema.fields.marginAuto = marginAuto

    this.addedClassFeilds.push('marginAuto')
  }

  addMarginAll(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.marginAll = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginAll = marginAll

    this.addedClassFeilds.push('marginAll')
  }

  addMarginH(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.marginH = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginH = marginH


    this.addedClassFeilds.push('marginH')
  }

  addMarginV(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.marginV = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginV = marginV

    this.addedClassFeilds.push('marginV')
  }

  addMarginTop(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.marginTop = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginTop = marginTop

    this.addedClassFeilds.push('marginTop')
  }

  addMarginBottom(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.marginBottom = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginBottom = marginBottom

    this.addedClassFeilds.push('marginBottom')
  }

  addMarginLeft(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.marginLeft = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginLeft = marginLeft

    this.addedClassFeilds.push('marginLeft')
  }

  addMarginRight(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.marginRight = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginRight = marginRight

    this.addedClassFeilds.push('marginRight')
  }
//---
  addPaddingAll(){
    this.$schema.groups.padding = this.groups.padding
    this.$meta.paddingAll = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.paddingAll = paddingAll

    this.addedClassFeilds.push('paddingAll')
  }

  addPaddingH(){
    this.$schema.groups.padding = this.groups.padding
    this.$meta.paddingH = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.paddingH = paddingH


    this.addedClassFeilds.push('paddingH')
  }

  addPaddingV(){
    this.$schema.groups.padding = this.groups.padding
    this.$meta.paddingV = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.paddingV = paddingV

    this.addedClassFeilds.push('paddingV')
  }

  addPaddingTop(){
    this.$schema.groups.padding = this.groups.padding
    this.$meta.paddingTop = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.paddingTop = paddingTop

    this.addedClassFeilds.push('paddingTop')
  }

  addPaddingBottom(){
    this.$schema.groups.padding = this.groups.padding
    this.$meta.paddingBottom = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.paddingBottom = paddingBottom

    this.addedClassFeilds.push('paddingBottom')
  }

  addPaddingLeft(){
    this.$schema.groups.padding = this.groups.padding
    this.$meta.paddingLeft = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.paddingLeft = paddingLeft

    this.addedClassFeilds.push('paddingLeft')
  }

  addPaddingRight(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.paddingRight = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.paddingRight = paddingRight

    this.addedClassFeilds.push('paddingRight')
  }

  clone(){
    let copy = super.clone()
    copy.$meta.tag = this.$meta.tag

    for(var fieldName in this.addedClassFeilds){
      this.copyMetaTo(this.$meta[fieldName], copy.$meta[fieldName])
    }
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

    this.addedClassFeilds.forEach((fieldName)=>{
      this.metaFieldToViewModel(model, fieldName)
    })
    return model
  }

  metaFieldToViewModel(model, fieldName){
    for(var name in this.$meta[fieldName]){
      model.classList.add(this.$meta[fieldName][name])
    }
  }

}