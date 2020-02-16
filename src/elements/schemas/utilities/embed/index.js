import {OptionFragment} from "../../option-fragment"
import aspectRadio from "./aspect-radio"
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
    //to[this.fieldName] = {}
    //to[this.fieldName].addEmbed = from[this.fieldName].addEmbed.concat()
    //to[this.fieldName].removeEmbed = from[this.fieldName].removeEmbed.concat()
    //to[this.fieldName].EmbedColor = from[this.fieldName].EmbedColor
    //to[this.fieldName].EmbedRadius = from[this.fieldName].EmbedRadius
  }

  toViewModel(model, meta){
    //let metaFragment = meta[this.fieldName]
    //model.classList.push.apply(model.classList, metaFragment.addEmbed)
    //model.classList.push.apply(model.classList, metaFragment.removeEmbed)

    //model.classList.add(metaFragment.EmbedColor)
    //model.classList.add(metaFragment.EmbedRadius)
  }
}

var addonUtilEmbed = (node)=>{
  let utilEmbed = new UtilEmbed
  utilEmbed.addon(node)
  return utilEmbed
}

export {addonUtilEmbed}

