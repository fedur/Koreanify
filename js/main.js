(function() {
	var Jamo = require('./Jamo');
	var jamoInterface = new Jamo();
	console.log(jamoInterface);
	$( "#userInput" ).bind( "input", function() {

		var whiteSpaceReg = /\s(?=[a-zA-Z]+)/;
		var upperCaseReg = /π*(?=[A-Z])/; 

		//Get All the words (split by white space) in an array.
		var allWords = this.value.split(whiteSpaceReg); 
		var splitWords = [];

		for (i = 0; i<allWords.length; i++) {

			//Get all Syllables (split when new syllable is upperCase) in an array
			var syllables = allWords[i].split(upperCaseReg);

			//Putting em' to lowerCase just to be sure. Since upper case doesnt mean anything in Korean.
			$.each(syllables, function(index, value) {
				syllables[index] = value.toLowerCase();
			});

			// Array of arrays containing the syllables.
			splitWords.push(syllables);
		}
		$( "#resultText" ).html("");

		for (word of splitWords) {		
			var currentWord = "";
			for (syllable of word) {
				var result = jamoInterface.getRegex().exec(syllable);
				var unicode = jamoInterface.createSyllable(result[1], result[2], result[3]);
				
				if (unicode > 0) //If there's no error...
					currentWord += String.fromCharCode(unicode); 
			}
			console.log(currentWord);
			$( "#resultText" ).append(currentWord + " ");		
		}

	});

	$( "#clipboard").bind("click", function() {
		var copyTextArea = document.querySelector('#resultText');
		console.log(copyTextArea);
		var range = document.createRange();
		range.selectNode(copyTextArea);
		console.log(range);
		window.getSelection().addRange(range); 
		document.execCommand('copy');
		window.getSelection().removeAllRanges();
	})

})();
