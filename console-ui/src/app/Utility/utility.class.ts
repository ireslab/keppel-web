
export class utilityClass {

// function to validate NRIC number

 static isValidNric(theNric: any): boolean {
    var nric: any = [];
    nric.multiples = [2, 7, 6, 5, 4, 3, 2];

    if (!theNric || theNric == '') {
        return false;
    }

    if (theNric.length != 9) {
        return false;
    }

    var total = 0
        , count = 0
        , numericNric;
    var first = theNric[0]
        , last = theNric[theNric.length - 1];

    if (first != 'S' && first != 'T') {
        return false;
    }

    numericNric = theNric.substr(1, theNric.length - 2);

    if (isNaN(numericNric)) {
        return false
    }

    while (numericNric != 0) {
        total += (numericNric % 10) * nric.multiples[nric.multiples.length - (1 + count++)];

        numericNric /= 10;
        numericNric = Math.floor(numericNric);
    }

    var outputs;
    if (first == 'S') {
        outputs = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    }
    else {
        outputs = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'J', 'Z', 'I', 'H'];
    }
    return last == outputs[total % 11];
}
   

}
