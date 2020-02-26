import {FragmentBase} from "./fragment-base"

class Classes extends FragmentBase{
  constructor(){
    super()
    this.schema = {
      fieldName: 'classList',
      label:'Classes',
      widget:'OpLabelsInput',
      defaultValue:[],
    }

  }
  
}

var addonClasses = (node)=>{
  let classes = new Classes
  classes.addon(node)
  return classes
}

export {addonClasses}

