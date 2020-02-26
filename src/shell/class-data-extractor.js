function listValues(list){
  let values = []
  for(var value in list){
    values.push(value)
  }
  return values
}


function extractValueFromClasses(classList, fieldSchema){
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
  if(fieldSchema.widget === 'OpSelect' || fieldSchema.widget === 'OpSwitch'){
    removeArrayValue(classList, extractValueFromClasses(classList, fieldSchema))
    //console.log(value, classList)
    classList.push(value)
  }
}

export{extractValueFromClasses, setValueToClasses}