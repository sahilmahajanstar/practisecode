/**
 *
 * @param text string
 * @param variable array of string
 * @param value object {[key:string]:primitiveType}
 * @returns string
 * @example
 * text "hi I am :personName: and :age: year old"
 * variable ["personName", "age"]
 * value {personName:"sam", age:22}
 * return hi I am sam and 20 year old
 */
export function generateText(
  text: string,
  variable: Array<string>,
  value: object
) {
  for (let index = 0; index < variable.length; index++) {
    const variableName = variable[index]
    text = text.replace(`:${variableName}:`, `${value[variableName]}`)
  }
  return text
}

/**
 *
 * @param start number
 * @param text string
 * @returns object {variable:string, index:number}
 */
function parseVariableFromColon(start: number, text: string) {
  let variable = ''
  for (
    let variableIndex = start;
    variableIndex < text.length;
    variableIndex++
  ) {
    if (text[variableIndex] === ':') {
      return { variable, index: variableIndex + 1 }
    } else {
      const hasSpecialChar = text[variableIndex].match(
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
      )
      if (hasSpecialChar) {
        // variable Name not found as Special char not allow
        return { variable: '', index: variableIndex + 1 }
      }
      variable += text[variableIndex]
    }
  }
  // no variable with ending:
  return { variable: '', index: text.length }
}

/**
 * Method use to parse Variables From text
 * @param text string
 * @returns array of variables
 * @example "hi I am :personName: and :age: year old"
 * returns ["personName", "age"]
 */
export function getVaribles(text: string): Array<string> {
  let variables: Array<string> = []
  for (let index = 0; index < text.length; ) {
    let variable = ''
    if (text[index] === ':') {
      const result = parseVariableFromColon(index + 1, text)
      variable = result.variable
      index = result.index
    } else {
      index++
    }
    if (variable.length) {
      variables.push(variable)
    }
  }
  return variables
}

const text = "hi I am :personName: and :age: year old"
console.log(getVaribleNamesFromString(text))
console.log(generateText(text, getVaribleNamesFromString(text), {personName:"sam", age:22}))
