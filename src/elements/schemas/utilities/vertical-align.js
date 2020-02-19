import {OptionFragment} from "../option-fragment"

let utilVerticalAlignmentSchema = {
  label:'Vertical align',
  group:'utilities',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'align-baseline':'Baseline',
    'align-top':'Top',
    'align-middle':'Middle',
    'align-bottom':'Bottom',
    'align-text-top':'Text Top',
    'align-text-bottom':'Text Bottom',
  },
}

class UtilVerticalAlignment extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilVerticalAlignmentSchema)

    this.metaFragment = '' 

    this.fieldName = 'utilVerticalAlignment'
  }

  copyMeta(from, to){
    to.utilVerticalAlignment = from.utilVerticalAlignment
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonUtilVerticalAlignment = (node, groupName)=>{
  let utilVerticalAlignment = new UtilVerticalAlignment
  utilVerticalAlignment.addon(node, groupName)
  return utilVerticalAlignment
}

export {addonUtilVerticalAlignment}

