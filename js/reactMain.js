var Jamo = require('./Jamo'); 
var jamoInterface = new Jamo();
var ReactDOM = require('react-dom');
var React = require('react');

var Input = React.createClass({
	getInitialState: function() {
		return {userText: "SeonSaengNim"};
	},

	updateText: function(e) {
		this.setState({userText: e.target.value});
	},

	render: function() {
		return (
			<div>
				<input id="userInput" type="text" onChange={this.updateText} value = {this.state.userText}/>
				<TranslatedResultBox userText={this.state.userText} />
			</div>
		);
	}
});

var TranslatedResultBox = React.createClass({
	getInitialState: function() {
		return({
			language: "Hangul",
			result: ""
		});
	},

	translateInput: function() {

		this.state.result = ""; // Reset the result.

		var wordsSplitInSyllables = this.splitWordsInSyllables(this.props.userText);

		for (word of wordsSplitInSyllables) {		
			var currentWord = "";
			for (syllable of word) {
				var result = jamoInterface.getRegex().exec(syllable);
				var unicode = jamoInterface.createSyllable(result[1], result[2], result[3]);
				
				if (unicode > 0) //If there's no error...
					currentWord += String.fromCharCode(unicode); 
			}
			this.state.result += (currentWord + " ");		
		}

		
	},

	splitWordsInSyllables: function(inputStream) {
		var whiteSpaceReg = /\s(?=[a-zA-Z]+)/;
		var upperCaseReg = /π*(?=[A-Z])/; 

		//Get All the words (split by white space) in an array.
		var allWords = this.props.userText.split(whiteSpaceReg); 
		var wordsArray = [];

		for (i = 0; i<allWords.length; i++) {

			//Get all Syllables (split when new syllable is upperCase) in an array
			var syllables = allWords[i].split(upperCaseReg);

			//Putting em' to lowerCase just to be sure. Since upper case doesnt mean anything in Korean.
			$.each(syllables, function(index, value) {
				syllables[index] = value.toLowerCase();
			});

			// Array of arrays containing the syllables.
			wordsArray.push(syllables);
		}
		return wordsArray;
	},

	render: function() {
		this.translateInput();
		return(
		<div className="container default result">
          <div className="row">
            <div className="col-xs-6">{this.state.language} : </div>
            <div className="col-xs-6">{this.state.result} </div>
          </div>
      </div>
      );
	}
});


ReactDOM.render(<Input />, document.querySelector('.inputText'));