function listValues(list){
  let values = []
  for(var value in list){
    values.push(value)
  }
  return values
}

function listNames(list){
  let names = []
  for(var value in list){
    names.push(list[value])
  }
  return names
}

function getFieldMetaValue(node, fieldSchema){
    var meta =node.meta
    let fieldName = fieldSchema.fieldName
    let metaValue = meta[fieldName]
    if(fieldName == 'classList'){
      metaValue = extractValueFromClasses(meta[fieldName], fieldSchema)
    }
    return metaValue
  }

function setFiedlMetaValue(value, node, fdSchema){
  if(fdSchema.fieldName === 'classList'){
    node.meta[fdSchema.fieldName] = setValueToClasses(value, node.meta[fdSchema.fieldName], fdSchema)
  }
  else{
    node.meta[fdSchema.fieldName] = value
  }
}


function extractValueFromClasses(classList, fieldSchema){
  if(fieldSchema.isRowGroup){
    let value = {}
    for(var fieldName in fieldSchema.fields){
      value[fieldName] = extractValueFromClasses(classList, fieldSchema.fields[fieldName])
    }
    return value
  }
  if(fieldSchema.isResponsive){
    let value = {}
    value.xs = extractValueFromClasses(classList, fieldSchema.xs)
    value.sm = extractValueFromClasses(classList, fieldSchema.sm)
    value.md = extractValueFromClasses(classList, fieldSchema.md)
    value.lg = extractValueFromClasses(classList, fieldSchema.lg)
    value.xl = extractValueFromClasses(classList, fieldSchema.xl)
    return value
  }
  if(fieldSchema.widget === 'OpSelect'){
    let sAllValue = new Set(listValues(fieldSchema.list))
    let intersect = classList.filter(x => sAllValue.has(x))
    if(intersect.length > 0){
      return intersect[0]
    }
    return ''
  }

  if(fieldSchema.widget === 'OpSwitch'){
    let sAllValue = new Set([fieldSchema.onValue, fieldSchema.offValue])
    let intersect = classList.filter(x => sAllValue.has(x))
    if(intersect.length > 0){
      return intersect[0]
    }
    return ''
  }

  if(fieldSchema.widget === 'OpBorderInput'){
    let sAllValue = new Set(listNames(fieldSchema.list))
    let intersect = classList.filter(x => sAllValue.has(x))
    return intersect
  }

  return ''
}

function removeArrayValue(array, value){
  for (var i = 0; i < array.length; i++) {
    if(array[i] === value){
      array.splice(i, 1)
      break
    }
  }
}

function setValueToClasses(value, classList, fieldSchema){
  if(fieldSchema.isResponsive){
    setValueToClasses(value.xs, classList, fieldSchema.xs)
    setValueToClasses(value.sm, classList, fieldSchema.sm)
    setValueToClasses(value.md, classList, fieldSchema.md)
    setValueToClasses(value.lg, classList, fieldSchema.lg)
    setValueToClasses(value.xl, classList, fieldSchema.xl)
  }
  if(fieldSchema.widget === 'OpSelect' || fieldSchema.widget === 'OpSwitch'){
    removeArrayValue(classList, extractValueFromClasses(classList, fieldSchema))
    if(value){
      classList.push(value)
    }
  }
  if(fieldSchema.widget === 'OpBorderInput'){
    let oldValues = new Set(extractValueFromClasses(classList, fieldSchema))
    classList = classList.filter(x => !oldValues.has(x))
    if(value){
      classList.push.apply(classList, value)
    }
  }

  return classList
}

export{getFieldMetaValue, setFiedlMetaValue, extractValueFromClasses, setValueToClasses}