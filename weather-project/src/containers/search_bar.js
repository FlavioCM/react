import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
	constructor(props){
		super(props);

		this.state = { term: '' };

		this.onInputChange = this.onInputChange.bind(this); // bind onInputChange to SearchBar and overwrite it with the new onInputChange
		// we do this because we have a callback
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({ term: event.target.value });
	}

	onFormSubmit(event) {
		event.preventDefault(); // so the server doesn't reserve the main page and clear the searchbar

		// need to go and fetch weather data
		this.props.fetchWeather(this.state.term);
		this.setState({term: ''});
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="input-group">
				<input placeholder="Get a five-day forecast of your favorite cities" className="form-control" value={this.state.term}
					onChange={this.onInputChange}/>
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Submit</button>
				</span>
			</form>
		)
	}

}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchWeather } , dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar)




