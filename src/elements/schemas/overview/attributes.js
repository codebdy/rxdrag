import {FragmentBase} from "./fragment-base"

class Attributes extends FragmentBase{
  constructor(){
    super()
    this.schema = {
      label:'Attributes',
      widget:'OpNameValueInput',
      defaultValue:{},
    }

    this.fieldName = 'attributes'
  }

  copyMeta(from, to){
    to[this.fieldName] = JSON.parse(JSON.stringify(from[this.fieldName]))
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model[this.fieldName] = JSON.parse(JSON.stringify(metaFragment))
  }
}

var addonAttributes = (node, groupName)=>{
  let attributes = new Attributes
  attributes.addon(node, groupName)
  return attributes
}

export {addonAttributes}

