import {FragmentBase} from "./fragment-base"

class Classes extends FragmentBase{
  constructor(){
    super()
    this.schema = {
      label:'Classes',
      widget:'OpLabelsInput',
      defaultValue:[],
    }

    this.fieldName = 'classList'
  }
  
}

var addonClasses = (node)=>{
  let classes = new Classes
  classes.addon(node)
  return classes
}

export {addonClasses}

