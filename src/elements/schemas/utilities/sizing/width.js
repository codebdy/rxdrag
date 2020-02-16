import {OptionFragment} from "../../option-fragment"

let utilWidthSchema = {
  label:'Width',
  group:'utilities',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'w-25':'25%',
    'w-50':'50%',
    'w-75':'75%',
    'w-100':'100%',
    'vw-100':'100vw',
    'mw-100':'Max 100%',
    'min-vw-100':'Min 100vw',
  },
}

class UtilWidth extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilWidthSchema)

    this.metaFragment = '' 

    this.fieldName = 'utilWidth'
  }

  copyMeta(from, to){
    copy.$meta.utilWidth = from.$meta.utilWidth
  }

  toViewModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonUtilWidth = (node)=>{
  let utilWidth = new UtilWidth
  utilWidth.addon(node)
  return utilWidth
}

export {addonUtilWidth}

