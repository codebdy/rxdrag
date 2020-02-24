import {OptionFragment} from "../../option-fragment"
import addBorder from "./add"
import removeBorder from "./remove"
import borderColor from "./color"
import borderRadius from "./radius"

var utilBorderSchema = {
  group:'utilities',
  label:'Border',
  isRowGroup:true,
  fields:{
    borderColor : borderColor,
    addBorder : addBorder,
    removeBorder : removeBorder,
    borderRadius : borderRadius,
  }
}

class UtilBorder extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilBorderSchema)

    this.fieldName = 'utilBorder'
  }

  copyMeta(from, to){
    //to[this.fieldName] = {}
    let meta = from[this.fieldName]
    if(meta){
      to[this.fieldName] = JSON.parse(JSON.stringify(from[this.fieldName]))
    }
    //to[this.fieldName].removeBorder = from[this.fieldName].removeBorder.concat()
    //to[this.fieldName].borderColor = from[this.fieldName].borderColor
    //to[this.fieldName].borderRadius = from[this.fieldName].borderRadius
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName] ? meta[this.fieldName] : {}
    model.classList.push.apply(model.classList, metaFragment.addBorder)
    model.classList.push.apply(model.classList, metaFragment.removeBorder)

    model.classList.add(metaFragment.borderColor)
    model.classList.add(metaFragment.borderRadius)
  }
}

var addonUtilBorder = (node, groupName)=>{
  let utilBorder = new UtilBorder
  utilBorder.addon(node, groupName)
  return utilBorder
}

export {addonUtilBorder}

