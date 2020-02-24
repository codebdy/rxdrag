import {OptionFragment} from "../option-fragment"

class Classes extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Classes',
      widget:'OpLabelsInput',
      group:'generalOptions',
      defaultValue:[],
    }

    this.fieldName = 'classList'
  }

  copyMeta(from, to){
    //to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    //model.attributes['aria-label'] = metaFragment
  }
}

var addonClasses = (node, groupName)=>{
  let classes = new Classes
  classes.addon(node, groupName)
  return classes
}

export {addonClasses}

