import {rules} from './Rules.js'

export class OptionsFactory{

  resolveOptions(node, breakPoint){

    let rule = rules[node.ruleName]

    if(rule){
      return rule.resolveOptions(node, breakPoint)
    }
    return []
  }
}