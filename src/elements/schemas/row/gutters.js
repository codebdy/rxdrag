import {OptionFragment} from "../option-fragment"

class RowGutters extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Gutters',
      widget:'OpSwitch',
      required:true,
      group:'rowOptions',
      onValue:'',
      offValue:'no-gutters',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'rowGutters'
  }

  copyMeta(from, to){
    to.rowGutters = from.rowGutters
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonRowGutters = (node)=>{
  let rowGutters = new RowGutters
  rowGutters.addon(node)
  return rowGutters
}

export {addonRowGutters}

