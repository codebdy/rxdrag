import {FragmentBase} from "./fragment-base"


class Tag extends FragmentBase{
  constructor(){
    super()
    this.schema = {
      fieldName:'tag',
      label:'Tag',
      widget:'OpTextField',
      defaultValue:'',
    }
  }
}

var addonTag = (node, groupName)=>{
  let tag = new Tag
  tag.addon(node, groupName)
  return tag
}

export {addonTag}

