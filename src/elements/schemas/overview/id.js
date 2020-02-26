import {FragmentBase} from "./fragment-base"

class HTMLId extends FragmentBase{
  constructor(){
    super()
    this.schema = {
      label:'ID',
      widget:'OpTextField',
      defaultValue:'',
    }

    this.fieldName = 'htmlId'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.attributes['id'] = metaFragment
  }
}

var addonHTMLId = (node, groupName)=>{
  let htmlId = new HTMLId
  htmlId.addon(node, groupName)
  return htmlId
}

export {addonHTMLId}

