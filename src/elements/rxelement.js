import {Node} from "../core/node"
import marginAuto from "./schemas/margin/margin-auto"
import margin from "./schemas/margin/margin"

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
    //备忘：Flexbox: flex container, flex item
    //Extra:显示，可见性，浮动，图片替换，内容溢出，定位，
    //      inline、inline-block、inline-table、和 table 元素的垂直对齐
    //      尺寸
    //Typography：字体（暂缓），颜色，对齐
    //Decorations：边框、颜色、阴影，透明度
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

    this.addedFeilds.push('marginAuto')
  }

//---
  addPaddingAll(){
    this.$schema.groups.padding = this.groups.padding
    this.$meta.paddingAll = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.paddingAll = paddingAll

    this.addedFeilds.push('paddingAll')
  }

  addMargin(){
    this.$schema.groups.margin = this.groups.margin
    this.$meta.margin = {}
    this.$meta.margin.all = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.margin.horizontal = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.margin.vertical = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.margin.top = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.margin.bottom = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.margin.left = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.margin.right = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$schema.fields.margin = margin
    this.addedFieldGroups.push('margin')
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

    return model
  }

  metaFieldToViewModel(model, metaFragment){
    for(var name in metaFragment){
      model.classList.add(metaFragment[name])
    }
  }

}