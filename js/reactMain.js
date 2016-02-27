var Jamo = require('./Jamo'); 
var jamoInterface = new Jamo();
var ReactDOM = require('react-dom');
var React = require('react');

var TranslatedResultBox = React.createClass({
	getInitialState: function() {
		return({
			language: "Hangul",
			result: ""
		});
	},

	render: function() {
		return(
		<div className="container default result">
          <div className="row">
            <div className="col-xs-6">{this.state.language} : </div>
            <div className="col-xs-6"><p id="resultText"></p>
            </div>
          </div>
      </div>
      );
	}
});

var Input = React.createClass({
	getInitialState: function() {
		return {userText: "hanGug"};
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

ReactDOM.render(<Input />, document.querySelector('.inputText'));