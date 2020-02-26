import {FragmentBase} from "./fragment-base"

class Attributes extends FragmentBase{
  constructor(){
    super()
    this.schema = {
      fieldName: 'attributes',
      label:'Attributes',
      widget:'OpNameValueInput',
      defaultValue:{},
    }

    //this.
  }

  copyMeta(from, to){
    to[this.fieldName] = JSON.parse(JSON.stringify(from[this.schema.fieldName]))
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.schema.fieldName]
    model[this.schema.fieldName] = JSON.parse(JSON.stringify(metaFragment))
  }
}

var addonAttributes = (node, groupName)=>{
  let attributes = new Attributes
  attributes.addon(node, groupName)
  return attributes
}

export {addonAttributes}

