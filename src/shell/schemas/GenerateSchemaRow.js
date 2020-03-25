import {SelectRow} from './SelectRow'

export class GenerateSchemaRow extends SelectRow{
  constructor(schema) {
    super(schema)
  }

  init(){
    this.valueScope = this.generateValueScope()
    this.props.list = this.generateValueList()
  }

  generateValueScope(){
    let schema = this.schema
    let returnArray = []
    let pointStr = this.breakPoint === 'xs' ? '' : '-' + this.breakPoint
    schema.steps.forEach(step=>{
      let stepValue = step ?  '-' + step : ''
      returnArray.push(schema.prefix + pointStr + stepValue)
    })
    return returnArray
  }

  generateValueList(){
    let schema = this.schema
    let returnList = {}
    let pointStr = this.breakPoint === 'xs' ? '' : '-' + this.breakPoint
    schema.steps.forEach(step=>{
      let stepValue = step ?  '-' + step : ''
      let value = schema.prefix + pointStr + stepValue
      if(schema.isStepAsLabel){
        returnList[value] = step.charAt(0).toUpperCase() + step.slice(1)
      }
      else{
        returnList[value] = i18n.t('classes.' + schema.prefix + stepValue)
      }
    })
    return returnList
  }
}