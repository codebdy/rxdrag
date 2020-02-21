import {OptionFragment} from "../option-fragment"

let tableContextualSchema = {
  label:'Contextual',
  group:'tableOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'table-active':'Active',
    'table-primary':'Primary',
    'table-secondary':'Secondary',
    'table-success':'Success',
    'table-danger':'Danger',
    'table-warning':'Warning',
    'table-info':'Info',
    'table-light':'Light',
    'table-dark':'Dark',
  },
}

class TableContextual extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, tableContextualSchema)

    this.metaFragment = '' 

    this.fieldName = 'tableContextual'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonTableContextual = (node, groupName)=>{
  let tableContextual = new TableContextual
  tableContextual.addon(node, groupName)
  return tableContextual
}

export {addonTableContextual}

