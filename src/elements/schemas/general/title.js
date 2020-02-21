import {OptionFragment} from "../option-fragment"

class GeneralTitle extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Title',
      widget:'OpTextField',
      group:'generalOptions',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'generalTitle'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.attributes['title'] = metaFragment
  }
}

var addonGeneralTitle = (node, groupName)=>{
  let generalTitle = new GeneralTitle
  generalTitle.addon(node, groupName)
  return generalTitle
}

export {addonGeneralTitle}

