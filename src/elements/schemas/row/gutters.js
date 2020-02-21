import {OptionFragment} from "../option-fragment"

class RowGutters extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Gutters',
      widget:'OpSwitch',
      group:'rowOptions',
      onValue:'',
      offValue:'no-gutters',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'rowGutters'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonRowGutters = (node, groupName)=>{
  let rowGutters = new RowGutters
  rowGutters.addon(node, groupName)
  return rowGutters
}

export {addonRowGutters}

