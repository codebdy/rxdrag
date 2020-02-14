import {Node} from "../core/node"
import marginAuto from "./schemas/margin-auto"
import marginAll from "./schemas/margin-all"
import marginH from "./schemas/margin-h"
import marginV from "./schemas/margin-v"

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
      'dimension':{
        label:'Dimension'
      }
    }
  }

  addMarginAuto(){
    this.$schema.groups.dimension = this.groups.dimension
    this.$meta.marginAuto = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$schema.fields.marginAuto = marginAuto

    this.addedClassFeilds.push('marginAuto')
  }

  addMarginAll(){
    this.$schema.groups.dimension = this.groups.dimension
    this.$meta.marginAll = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginAll = marginAll

    this.addedClassFeilds.push('marginAll')
  }

  addMarginH(){
    this.$schema.groups.dimension = this.groups.dimension
    this.$meta.marginH = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginH = marginH


    this.addedClassFeilds.push('marginH')
  }

  addMarginV(){
    this.$schema.groups.dimension = this.groups.dimension
    this.$meta.marginV = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$schema.fields.marginV = marginV

    this.addedClassFeilds.push('marginV')
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