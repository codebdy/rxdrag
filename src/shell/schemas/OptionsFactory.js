import {rules} from './Rules.js'
import {RXSchema} from './RXSchema.js'

export class OptionsFactory{

  resolveOptions(node, breakPoint){

    let rule = rules[node.ruleName]

    rule = rule ? rule : new RXSchema
    return rule.resolveOptions(node, breakPoint)
  }
}