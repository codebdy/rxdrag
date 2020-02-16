import {Node} from "../core/node"

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

  clone(){
    let copy = super.clone()
    copy.$meta.tag = this.$meta.tag

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

    this.addons.forEach((addon)=>{
      addon.toViewModel(model, this.$meta)
    })

    return model
  }
}