import {FragmentBase} from "./fragment-base"


class Tag extends FragmentBase{
  constructor(){
    super()
    this.schema = {
      label:'Tag',
      widget:'OpTextField',
      defaultValue:'',
    }

    this.fieldName = 'tag'
  }
}

var addonTag = (node, groupName)=>{
  let tag = new Tag
  tag.addon(node, groupName)
  return tag
}

export {addonTag}

