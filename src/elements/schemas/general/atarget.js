import {OptionFragment} from "../option-fragment"

let aTargetSchema = {
  label:'Target',
  group:'aOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    '_blank':'_blank',
    '_self':'_self',
    '_parent':'_parent',
    '_top':'_top',
  },
}

class ATarget extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, aTargetSchema)

    this.fieldName = 'aTarget'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.attributes['target'] = metaFragment
  }
}

var addonATarget = (node, groupName)=>{
  let aTarget = new ATarget
  aTarget.addon(node, groupName)
  return aTarget
}

export {addonATarget}

