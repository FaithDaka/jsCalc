
// when passed a string value, it will return a list of parentheses e.g
// ( 8 + 2 ) => [[0, 8]]
function parenthesesPositions(val){
	let openParPos = null
	let closeParPos = null
	let arr = []

	for (let i = 0; i < val.length - 1; i++) {
		if(val[i] == '(' && (val[i+2] && val[i+2]=='(')){
			openParPos = i
			let countOfPar = 0
			let start = 0
			for (let j = i; j < val.length; j++) {
				if(j > i + 1 && (val[j] == '(' || val[j] == ')')) countOfPar ++
				if (countOfPar%2 == 1 && val[j] == ')') {
					closeParPos = j
					break
				}
			}

			if(arr[arr.length - 1]){
				if((closeParPos > arr[arr.length - 1][1])){
					arr.push([openParPos, closeParPos])
				}
			}else {
				arr.push([openParPos, closeParPos])
			}
		} 
		else if(val[i] == '(' && (val[i+2] && val[i+2]!='(')){
			openParPos = i
			let countOfPar = 0
			let start = 0
			for (let j = i; j < val.length; j++) {
				if(j > i + 1 && (val[j] == '(' || val[j] == ')')) countOfPar ++
				if (countOfPar%2 == 1 && val[j] == ')') {
					closeParPos = j
					break
				}
			}
			if(arr[arr.length - 1]){
				if((closeParPos > arr[arr.length - 1][1])){
					arr.push([openParPos, closeParPos])
				}
			}else {
				arr.push([openParPos, closeParPos])
			}
		}
	}
	return arr
}

// replace the paretheses and it contents with an underscore
// 5 + ( 9 * 2 ) => 5 + _
function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}

function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    var calculation = [],
        current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
        if ('^*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

// evaluates a string passed to it
function calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [
            {
                '^': function(a, b) {
                    return Math.pow(a, b);
                    }
            }, 
            {
                '*': function(a, b) {
                    return a * b
                },

                '/': function(a, b) {
                    return a / b
                },
            }, 
            {
                '+': function(a, b) {
                    return a + b
                },

                '-': function(a, b) {
                    return a - b
                }
            }
        ],
        newCalc = [],
        currentOp;
    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
}

function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

// var expressionString = "3 * ( 3 ) + ( 7 + ( 2 * 3 ) )"
var expressionString = "( 8 + 9 ) * ( 5 + 9 ) + 4 * 2 / 2 + ( 9 + 4 / 7 )"
let parenthesesPositionsList = parenthesesPositions(expressionString)

let newString = expressionString

let parContentList = []

for (let i = parenthesesPositionsList.length - 1; i >= 0; i--) {
	newString = replaceRange(newString, parenthesesPositionsList[i][0], parenthesesPositionsList[i][1]+1, "_"); 
}

for (let i = parenthesesPositionsList.length - 1; i >= 0; i--) {
	parContentList.push(expressionString.substring(parenthesesPositionsList[i][0] + 2, parenthesesPositionsList[i][1]-1))
}

for (var i = 0; i<parContentList.length; i++) {
	let index = newString.lastIndexOf("_");
	let evaluation = calculate(parseCalculationString(parContentList[i]))
	newString = replaceAt(newString, index, evaluation.toString())
}

console.log(expressionString)
console.log(calculate(parseCalculationString(newString)))
