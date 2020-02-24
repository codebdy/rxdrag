import {OptionFragment} from "../option-fragment"

let utilScreenReadersSchema = {
  label:'Screen Readers',
  group:'utilities',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'sr-only':'Only',
    'sr-only-focusable':'Only Focusable',
  },
}

class UtilScreenReaders extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilScreenReadersSchema)

    this.fieldName = 'utilScreenReaders'
  }

  copyMeta(from, to){
    to.utilScreenReaders = from.utilScreenReaders
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonUtilScreenReaders = (node, groupName)=>{
  let utilScreenReaders = new UtilScreenReaders
  utilScreenReaders.addon(node, groupName)
  return utilScreenReaders
}

export {addonUtilScreenReaders}

