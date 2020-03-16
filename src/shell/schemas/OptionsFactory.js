import {rules} from './Rules.js'

export class OptionsFactory{

  resolveOptions(node){

    let rule = rules[node.ruleName]

    if(rule){
      return rule.resolveOptions(node)
    }
    return []
  }
}