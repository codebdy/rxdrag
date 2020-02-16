import {Node} from "../core/node"
import marginAuto from "./schemas/utilities/margin/margin-auto"
import baseMargin from "./schemas/utilities/margin"
import basePadding from "./schemas/utilities/padding"
import baseWidth from "./schemas/utilities/sizing/width"
import baseHeight from "./schemas/utilities/sizing/height"
import responsiveMeta from "./schemas/responsive"

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

    this.$schema.groups = {}

    //备忘：Flexbox: flex container, flex item
    //Extra:显示，可见性，浮动，图片替换，内容溢出，定位，
    //      inline、inline-block、inline-table、和 table 元素的垂直对齐
    //      尺寸
    //Typography：字体（暂缓），颜色，对齐
    //Decorations：边框、颜色、阴影，透明度
    this.groups = {
      'utilities':{
        label:'Bootstrap Utilities',
      },
      'decorations':{
        label:'Decorations',
      },
    }
  }

  addMarginAuto(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.marginAuto = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$schema.fields.marginAuto = Object.assign({}, marginAuto)

    this.addedFeilds.push('marginAuto')
  }

//---
  addPadding(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.basePadding = {}
    this.$meta.basePadding.all = Object.assign({}, responsiveMeta)
    this.$meta.basePadding.horizontal = Object.assign({}, responsiveMeta)
    this.$meta.basePadding.vertical = Object.assign({}, responsiveMeta)
    this.$meta.basePadding.top = Object.assign({}, responsiveMeta)
    this.$meta.basePadding.bottom = Object.assign({}, responsiveMeta)
    this.$meta.basePadding.left = Object.assign({}, responsiveMeta)
    this.$meta.basePadding.right = Object.assign({}, responsiveMeta)

    this.$schema.fields.basePadding = Object.assign({}, basePadding)
    this.addedFieldGroups.push('basePadding')
  }

  addMargin(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.baseMargin = {}
    this.$meta.baseMargin.all = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.baseMargin.horizontal = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.baseMargin.vertical = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.baseMargin.top = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.baseMargin.bottom = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.baseMargin.left = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.baseMargin.right = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$schema.fields.baseMargin = Object.assign({}, baseMargin)
    this.addedFieldGroups.push('baseMargin')
  }

  addWidth(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.baseWidth = ''
    this.$schema.fields.baseWidth = baseWidth
  }

  addHeight(){
    this.$schema.groups.utilities = this.groups.utilities
    this.$meta.baseHeight = ''
    this.$schema.fields.baseHeight = baseHeight
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

    copy.$meta.baseWidth = this.$meta.baseWidth
    copy.$meta.baseHeight = this.$meta.baseHeight
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

    model.classList.add(this.$meta.baseWidth)
    model.classList.add(this.$meta.baseHeight)

    return model
  }

  metaFieldToViewModel(model, metaFragment){
    for(var name in metaFragment){
      model.classList.add(metaFragment[name])
    }
  }

}