import {OptionFragment} from "../option-fragment"

var textColor = {
  label:'Text Color',
  widget:'OpSelect',
  list:{
    'text-primary':'Primary',
    'text-secondary':'Secondary',
    'text-success':'Success',
    'text-danger':'Danger',
    'text-warning':'Warning',
    'text-info':'Info',
    'text-light':'Light',
    'text-dark':'Dark',
    'text-muted':'Muted',
    'text-white':'White',
  },
}

var backgroundColor = {
  label:'Background Color',
  widget:'OpSelect',
  list:{
    'bg-primary':'Primary',
    'bg-secondary':'Secondary',
    'bg-success':'Success',
    'bg-danger':'Danger',
    'bg-warning':'Warning',
    'bg-info':'Info',
    'bg-light':'Light',
    'bg-dark':'Dark',
    'bg-white':'White',
    'bg-transparent':'Transparent',
  },
}

class UtilColor extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      group:'utilities',
      label:'Color',
      isRowGroup:true,
      fields:{
        textColor : textColor,
        backgroundColor : backgroundColor,
      }
    }

    this.metaFragment = {
      textColor : '',
      backgroundColor : '',
    }
    this.fieldName = 'utilColor'
  }

  copyMeta(from, to){
    to.textColor = from.textColor
    to.backgroundColor = from.backgroundColor
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment.textColor)
    model.classList.add(metaFragment.backgroundColor)
  }
}

var addonUtilColor = (node, groupName)=>{
  let utilColor = new UtilColor
  utilColor.addon(node, groupName)
  return utilColor
}

export {addonUtilColor}

