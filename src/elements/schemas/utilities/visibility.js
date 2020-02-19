import {OptionFragment} from "../option-fragment"

let utilVisibilitySchema = {
  label:'Visibility',
  group:'utilities',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'visible':'Visible',
    'invisible':'Invisible',
  },
}

class UtilVisibility extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilVisibilitySchema)

    this.metaFragment = '' 

    this.fieldName = 'utilVisibility'
  }

  copyMeta(from, to){
    to.utilVisibility = from.utilVisibility
  }

  metaToModel(model, meta){
   let metaValue = meta[this.fieldName]
    if(metaValue === 'invisible'){
      model.classList.add('rx-invisble')
    }
    else{
      model.classList.add(meta[this.fieldName])
    }
  }
}

var addonUtilVisibility = (node, groupName)=>{
  let utilVisibility = new UtilVisibility
  utilVisibility.addon(node, groupName)
  return utilVisibility
}

export {addonUtilVisibility}

