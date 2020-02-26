import {FragmentBase} from "./fragment-base"

class HTMLId extends FragmentBase{
  constructor(){
    super()
    this.schema = {
      fieldName:'htmlId',
      label:'ID',
      widget:'OpTextField',
      defaultValue:'',
    }
  }

  copyMeta(from, to){
    to[this.schema.fieldName] = from[this.schema.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.schema.fieldName]
    model.attributes['id'] = metaFragment
  }
}

var addonHTMLId = (node, groupName)=>{
  let htmlId = new HTMLId
  htmlId.addon(node, groupName)
  return htmlId
}

export {addonHTMLId}

