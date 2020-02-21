import {OptionFragment} from "../option-fragment"

let trScopeSchema = {
  label:'Scope',
  group:'trOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'col':'col',
    'row':'row',
  },
}

class TrScope extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, trScopeSchema)

    this.metaFragment = '' 

    this.fieldName = 'trScope'
  }

  copyMeta(from, to){
    to.trScope = from.trScope
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonTrScope = (node, groupName)=>{
  let trScope = new TrScope
  trScope.addon(node, groupName)
  return trScope
}

export {addonTrScope}

