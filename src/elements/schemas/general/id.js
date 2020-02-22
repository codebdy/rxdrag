import {OptionFragment} from "../option-fragment"

class HTMLId extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'ID',
      widget:'OpTextField',
      group:'generalOptions',
      defaultValue:'',
    }

    this.metaFragment = '' 

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

