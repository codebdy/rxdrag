import {OptionFragment} from "../option-fragment"

class GridRow extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Row',
      widget:'OpSwitch',
      required:true,
      group:'typographyOptions',
      onValue:'row',
      offValue:'',
      defaultValue:'',
    }

    this.fieldName = 'typyRow'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonGridRow = (node, groupName)=>{
  let gridRow = new GridRow
  gridRow.addon(node, groupName)
  return gridRow
}

export {addonGridRow}

