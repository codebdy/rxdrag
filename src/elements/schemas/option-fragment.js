export class OptionFragment{
  constructor(){
  }

  addon(node, groupName){
    if(groupName){
      this.schema.group = groupName
    }
    this.addToGroup(node, this.schema.group)
    node.addons.push(this)
    if(!node.$meta[this.fieldName]){
      node.$meta[this.fieldName] = this.metaFragment
    }
    node.$schema.fields[this.fieldName] = this.schema
  }

  addToGroup(node, groupName){
    node.addToGroup(groupName)
  }

  copyResponsiveGroupMetasTo(from, to){
    for(var fieldName in from){
      this.copyResponsiveMetaTo(from[fieldName], to[fieldName])
    }
  }

  copyResponsiveMetaTo(from, to){
    for(var name in from){
      to[name] = from[name]
    }
  }

  responsiveMetaGroupToViewModel(model, meta){
    for(var fieldName in meta){
      this.responsiveMetaFieldToViewModel(model, meta[fieldName])
    }
  }

  responsiveMetaFieldToViewModel(model, metaFragment){
    for(var name in metaFragment){
      model.classList.add(metaFragment[name])
    }
  }

  setDefaultValue(defaultValue){
    this.schema.defaultValue = defaultValue
    return this
  }

}