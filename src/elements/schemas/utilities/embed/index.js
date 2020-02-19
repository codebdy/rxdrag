import {OptionFragment} from "../../option-fragment"
import aspectRadio from "./aspect-ratio"
import responsive from "./responsive"

var utilEmbedSchema = {
  group:'utilities',
  label:'Embed',
  isRowGroup:true,
  fields:{
    responsive : responsive,
    aspectRadion : aspectRadio,
  }
}


class UtilEmbed extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilEmbedSchema)

    this.metaFragment = {
      responsive:'',
      aspectRadion:'',
    } 

    this.fieldName = 'utilEmbed'
  }

  copyMeta(from, to){
    to[this.fieldName] = {}
    to[this.fieldName].responsive = from[this.fieldName].responsive
    to[this.fieldName].aspectRadion = from[this.fieldName].aspectRadion
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment.responsive)
    model.classList.add(metaFragment.aspectRadion)
  }
}

var addonUtilEmbed = (node, groupName)=>{
  let utilEmbed = new UtilEmbed
  utilEmbed.addon(node, groupName)
  return utilEmbed
}

export {addonUtilEmbed}

