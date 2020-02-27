function listValues(list){
  let values = []
  for(var value in list){
    values.push(value)
  }
  return values
}


function extractValueFromClasses(classList, fieldSchema){
  if(fieldSchema.isRowGroup){
    let value = {}
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
}

export{extractValueFromClasses, setValueToClasses}