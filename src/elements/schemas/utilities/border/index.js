import addBorder from "./add"
import removeBorder from "./remove"
import borderColor from "./color"
import borderRadius from "./radius"
import responsiveMeta from "../../responsive"

var utilBorderSchema = {
  group:'utilities',
  label:'Border',
  isRowGroup:true,
  fields:{
  	addBorder : addBorder,
  	removeBorder : removeBorder,
  	borderColor : borderColor,
  	borderRadius : borderRadius,
  }
}

var utilBorderMeta = {
  addBorder : Object.assign({}, responsiveMeta),
  removeBorder : Object.assign({}, responsiveMeta),
  borderColor : Object.assign({}, responsiveMeta),
  borderRadius : Object.assign({}, responsiveMeta),
}

export{utilBorderSchema, utilBorderMeta}
