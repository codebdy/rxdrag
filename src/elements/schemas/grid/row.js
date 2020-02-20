import {OptionFragment} from "../option-fragment"

class GridRow extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Row',
      widget:'OpSwitch',
      required:true,
      group:'gridOptions',
      onValue:'row',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'gridRow'
  }

  copyMeta(from, to){
    to.gridRow = from.gridRow
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

