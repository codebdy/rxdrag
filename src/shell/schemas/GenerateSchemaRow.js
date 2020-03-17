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
    for(var i = 0; i <= schema.steps; i++){
      returnArray.push(schema.prefix + pointStr + '-' + i)
    }

    return returnArray
  }

  generateValueList(){
    let schema = this.schema
    let returnList = {}
    let pointStr = this.breakPoint === 'xs' ? '' : '-' + this.breakPoint
    for(var i = 0; i <= schema.steps; i++){
      let value = schema.prefix + pointStr + '-' + i
      returnList[value] = i
    }

    return returnList
  }
}