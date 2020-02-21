import {OptionFragment} from "../option-fragment"

class AHref extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Href',
      widget:'OpTextField',
      group:'aOptions',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'aHref'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.attributes['href'] = metaFragment
  }
}

var addonAHref = (node, groupName)=>{
  let aHref = new AHref
  aHref.addon(node, groupName)
  return aHref
}

export {addonAHref}

