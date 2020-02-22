import {RXElement} from "../rxelement"
import {addonGeneralTextfield} from "../schemas/general/textfield"

export class RXTextfieldable extends RXElement{
  constructor() {
    super()
    addonGeneralTextfield(this)
  }

  toViewModel(){
    let model = super.toViewModel()
    if(this.$meta.generalTextfield === 'contentEditable'){
      model.styles.padding = ''
    }
    else{
      model.styles.padding = this.editMarginStyle.padding
    }

    return model
  }

}