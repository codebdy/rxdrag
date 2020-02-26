import {OptionFragment} from "../option-fragment"

class Classes{
  constructor(){
    this.schema = {
      label:'Classes',
      widget:'OpLabelsInput',
      defaultValue:[],
    }

    this.fieldName = 'classList'
  }

  copyMeta(from, to){}

  metaToModel(model, meta){}

  addon(node){
    node.$schema.overView[this.fieldName] = this.schema
  }

  setDefaultValue(defaultValue){
    this.schema.defaultValue = defaultValue
    return this
  }
  
}

var addonClasses = (node)=>{
  let classes = new Classes
  classes.addon(node)
  return classes
}

export {addonClasses}

