import {Node} from "../core/node"

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
    this.$meta.marginAuto = {
      xs:'',
      sm:'',
      md:'',
      lg:'',
      xl:'',
    }

    this.$schema.fields.marginAuto = {
      widget:'OptionRowGroup',
      group:'dimension',
      xs:{
        label:'Margin Auto',
        isFirst:true,
        widget:'OpSelect',
        list:{
          'm-auto':'All',
          'mx-auto':'Horizontal',
          'my-auto':'Vertical',
          'ml-auto':'Left',
          'mr-auto':'Right',
          'mt-auto':'Top',
          'mb-auto':'Bottom',
        },
      },
      //---------------------
      sm:{
        label:'SM',
        widget:'OpSelect',
        list:{
          'm-sm-auto':'All',
          'mx-sm-auto':'Horizontal',
          'my-sm-auto':'Vertical',
          'ml-sm-auto':'Left',
          'mr-sm-auto':'Right',
          'mt-sm-auto':'Top',
          'mb-sm-auto':'Bottom',
        },
      },
      //---------------------
      md:{
        label:'MD',
        widget:'OpSelect',
        list:{
          'm-md-auto':'All',
          'mx-md-auto':'Horizontal',
          'my-md-auto':'Vertical',
          'ml-md-auto':'Left',
          'mr-md-auto':'Right',
          'mt-md-auto':'Top',
          'mb-md-auto':'Bottom',
        },
      },
      //---------------------
      lg:{
        label:'LG',
        widget:'OpSelect',
        list:{
          'm-lg-auto':'All',
          'mx-lg-auto':'Horizontal',
          'my-lg-auto':'Vertical',
          'ml-lg-auto':'Left',
          'mr-lg-auto':'Right',
          'mt-lg-auto':'Top',
          'mb-lg-auto':'Bottom',
        },
      },
      //---------------------
      xl:{
        label:'XL',
        widget:'OpSelect',
        list:{
          'm-xl-auto':'All',
          'mx-xl-auto':'Horizontal',
          'my-xl-auto':'Vertical',
          'ml-xl-auto':'Left',
          'mr-xl-auto':'Right',
          'mt-xl-auto':'Top',
          'mb-xl-auto':'Bottom',
        },
      },
      //---------------------
    }//<--marginAuto

    this.addedClassFeilds.push('marginAuto')
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

    for(var fieldName in this.addedClassFeilds){
      this.metaFieldToViewModel(model, fieldName)
    }
    return model
  }

  metaFieldToViewModel(model, fieldName){
    for(var name in this.$meta[fieldName]){
      model.classList.add(this.$meta[fieldName][name])
    }
  }

}