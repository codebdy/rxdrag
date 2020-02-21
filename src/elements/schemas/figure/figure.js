import {OptionFragment} from "../option-fragment"

class Figure extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Figure',
      widget:'OpSwitch',
      group:'figureOptions',
      onValue:'figure',
      offValue:'',
      defaultValue:'figure',
    }

    this.metaFragment = 'figure' 

    this.fieldName = 'figure'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonFigure = (node, groupName)=>{
  let figure = new Figure
  figure.addon(node, groupName)
  return figure
}

export {addonFigure}

