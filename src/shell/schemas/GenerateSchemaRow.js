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
      returnArray.push(schema.prefix + pointStr + '-' + step)
    })
    return returnArray
  }

  generateValueList(){
    let schema = this.schema
    let returnList = {}
    let pointStr = this.breakPoint === 'xs' ? '' : '-' + this.breakPoint
    schema.steps.forEach(step=>{
      let value = schema.prefix + pointStr + '-' + step
      returnList[value] = i18n.t('classes.' + schema.prefix + '-' +step)
    })
    return returnList
  }
}