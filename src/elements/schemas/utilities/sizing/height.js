import {OptionFragment} from "../../option-fragment"

let utilHeightSchema = {
  label:'Height',
  group:'utilities',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'h-25':'25%',
    'h-50':'50%',
    'h-75':'75%',
    'h-100':'100%',
    'vh-100':'100vh',
    'mh-100':'Max 100%',
    'min-vh-100':'Min 100vh',
  },
}

class UtilHeight extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilHeightSchema)

    this.metaFragment = '' 

    this.fieldName = 'utilHeight'
  }

  copyMeta(from, to){
    to.utilHeight = from.utilHeight
  }

  toViewModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonUtilHeight = (node)=>{
  let utilHeight = new UtilHeight
  utilHeight.addon(node)
  return utilHeight
}

export {addonUtilHeight}

