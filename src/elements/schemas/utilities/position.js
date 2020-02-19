import {OptionFragment} from "../option-fragment"

let utilPositionSchema = {
  label:'Position',
  group:'utilities',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'position-static':'Static',
    'position-relative':'Relative',
    'position-absolute':'Absolute',
    'position-fixed':'Fixed',
    'position-sticky':'Sticky',
  },
}

class UtilPosition extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilPositionSchema)

    this.metaFragment = '' 

    this.fieldName = 'utilPosition'
  }

  copyMeta(from, to){
    to.utilPosition = from.utilPosition
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonUtilPosition = (node, groupName)=>{
  let utilPosition = new UtilPosition
  utilPosition.addon(node, groupName)
  return utilPosition
}

export {addonUtilPosition}

