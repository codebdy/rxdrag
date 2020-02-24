import {OptionFragment} from "../option-fragment"

let utilOverflowSchema = {
  label:'Overflow',
  group:'utilities',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'overflow-auto':'Auto',
    'overflow-hidden':'Hidden',
  },
}

class UtilOverflow extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilOverflowSchema)

    this.fieldName = 'utilOverflow'
  }

  copyMeta(from, to){
    to.utilOverflow = from.utilOverflow
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonUtilOverflow = (node, groupName)=>{
  let utilOverflow = new UtilOverflow
  utilOverflow.addon(node, groupName)
  return utilOverflow
}

export {addonUtilOverflow}

