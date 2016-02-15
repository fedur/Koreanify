var console = require("console-browserify");
var JamoCodes = require('./jamoDb');

validLetters = [];
validLetters.push(getSortedArrayFromKeys(JamoCodes.initial));
validLetters.push(getSortedArrayFromKeys(JamoCodes.medial));
validLetters.push(getSortedArrayFromKeys(JamoCodes.terminal));

var regexString = "";

for (i = 0; i<validLetters.length; i++) {
    regexString += "("; // Starts the set representing all valid characters that can form a Jamo

    for (j = 0; j<validLetters[i].length; j++) {
        regexString += "(?:" + validLetters[i][j] + ")";
        if (j != validLetters[i].length -1)
            regexString += "|";
    }

    regexString += ")"; // Ends the set representing all the characters forming a Jamo.
    regexString += "?"; // Matching the Jamo 0 or 1 times 
}

exports.getRegex = new RegExp(regexString);

exports.createSyllable = function(initialJ, medialJ, terminalJ) {
    if (initialJ == undefined) 
        initialJ = 11; //Empty Character -> ㅇ
    else
        initialJ = JamoCodes.initial[initialJ];

    if (medialJ == undefined)
        return -1;
    else
        medialJ = JamoCodes.medial[medialJ];

    if (terminalJ == undefined)
        terminalJ = 0;
    else
        terminalJ = JamoCodes.terminal[terminalJ];

    return initialJ*588+medialJ*28+terminalJ+44032
}


function getSortedArrayFromKeys(obj) {
    var sortedKeys = [];
    for (var key in obj) {
        sortedKeys.push(key);
    }

    sortedKeys.sort(function(a,b) {
        if (a < b)
            return 1;
        else
            return -1;
    });

    return sortedKeys;
}