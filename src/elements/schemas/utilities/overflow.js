import {OptionFragment} from "../option-fragment"

let utilOverflowSchema = {
  label:'Overflow',
  group:'utilities',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'Overflow-auto':'Auto',
    'Overflow-hidden':'Hidden',
  },
}

class UtilOverflow extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilOverflowSchema)

    this.metaFragment = '' 

    this.fieldName = 'utilOverflow'
  }

  copyMeta(from, to){
    to.utilOverflow = from.utilOverflow
  }

  toViewModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonUtilOverflow = (node)=>{
  let utilOverflow = new UtilOverflow
  utilOverflow.addon(node)
  return utilOverflow
}

export {addonUtilOverflow}

