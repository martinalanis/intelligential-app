const square3x3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

const rectangle4x3 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
]

const rectangle4x6 = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16],
  [17,18,19,20],
  [21,22,23,24]
]

const generateOutput = (arr) => {
  const len = arr.length * arr[0].length
  const out = []

  let pointerX = 0
  let limitXL = 0
  let limitXR = arr[0].length
  let pointerY = 0
  let limitYT = 0
  let limitYB = arr.length
  let added = 0

  while (added < len) {
    for (; pointerX < limitXR; pointerX++) {
      out.push(arr[pointerY][pointerX])
      added++
    }
    pointerX--
    limitYT++
    pointerY++

    if (added === len) break;
    for (; pointerY < limitYB; pointerY++) {
      out.push(arr[pointerY][pointerX])
      added++
    }
    pointerY--
    limitYB--
    limitXR--
    pointerX--

    if (added === len) break;
    for (; pointerX >= limitXL; pointerX--) {
      out.push(arr[pointerY][pointerX])
      added++
    }
    pointerX++
    limitXL++
    pointerY--

    if (added === len) break;
    for (; pointerY >= limitYT; pointerY--) {
      out.push(arr[pointerY][pointerX])
      added++
    }

    pointerX++
    pointerY++
  }
  return out
}

const printInitialArray = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

const init = () => {
  console.log('El Array 1 es:')
  printInitialArray(square3x3)
  console.log('El array generado es:')
  console.log(generateOutput(square3x3))
  console.log('El Array 2 es:')
  printInitialArray(rectangle4x3)
  console.log('El array generado es:')
  console.log(generateOutput(rectangle4x3))
  console.log('El Array 3 es:')
  printInitialArray(rectangle4x6)
  console.log('El array generado es:')
  console.log(generateOutput(rectangle4x6))
}

init()
