import React, { Component } from 'react';
import { Badge } from 'react-md';
import './timeForm.css';
// import './style/styles.css';


class TimeForm extends Component {

	constructor(props){
		super(props);

		this.state = { timeOption: "add", submitted:false, totalHours: 0, totalMinutes: 0, totalSeconds: 0,
			timeItems: [ {key: 1, hours: 0, minutes: 0, seconds: 0}, 
							{key: 2, hours: 0, minutes: 0, seconds: 0 } 
						] };

		this.addTimeItem = this.addTimeItem.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.calculateTime = this.calculateTime.bind(this);
		this.clearItems = this.clearItems.bind(this);
		this.handleTimeOptionChange = this.handleTimeOptionChange.bind(this);
		this.subtractTime = this.subtractTime.bind(this);

		
		
	}

	

	addTimeItem(e){
		const key = this.state.timeItems.length + 1;
		const timeItem = {key: key, hours: 0, minutes: 0, seconds: 0 };
		var timeItems = this.state.timeItems;
		timeItems.push(timeItem);
		this.setState({timeItems});
		this.setState({submitted: false});
		e.preventDefault();
	}

	handleChange(timeItemKey, e) {

		const index = timeItemKey - 1;
		for(var i = 0; i < this.state.timeItems.length; i++){
			var timeItem = this.state.timeItems[i];
			if(timeItem.key == timeItemKey){
				if(e.target.name == "hours"){
					timeItem.hours = e.target.value;
					this.setState(this.state.timeItems[index]: timeItem);
				}
				else if(e.target.name == "minutes"){
					timeItem.minutes = e.target.value;
					this.setState(this.state.timeItems[index]: timeItem);
				}
				else if(e.target.name == "seconds"){
					timeItem.seconds = e.target.value;
					this.setState(this.state.timeItems[index]: timeItem);
				}
				
			}
		}
		

	}

	calculateTime(){

		if(this.state.timeOption === "subtract"){
			console.log("we're subtracting");
			return this.subtractTime();
		}
		else {


			var totalHours = 0;
			var totalMinutes = 0;
			var totalSeconds = 0;

			for(var i = 0; i < this.state.timeItems.length; i++){
				const timeItem = this.state.timeItems[i];
				totalHours += parseInt(timeItem.hours);
				totalMinutes += parseInt(timeItem.minutes);
				totalSeconds += parseInt(timeItem.seconds);
			}

			// const cleanTime = cleanData(totalHours, totalMinutes, totalSeconds);
			var carryMinutes = 0;
			var carryHours = 0;

			while(totalSeconds > 60) {
				totalSeconds = totalSeconds - 60;
				carryMinutes++;
			}
			
			totalMinutes = totalMinutes + carryMinutes;

			while(totalMinutes > 60){
				totalMinutes = totalMinutes - 60;
				carryHours++;
			}
			totalHours = totalHours + carryHours;


			this.setState({totalHours});
			this.setState({totalMinutes});
			this.setState({totalSeconds});
			this.setState({submitted: true});

		}
	}

	subtractTime(){
		console.log("we are in subtractTime");
		var currentHours = parseInt(this.state.timeItems[0].hours);
		var currentMinutes = parseInt(this.state.timeItems[0].minutes);
		var currentSeconds = parseInt(this.state.timeItems[0].seconds);

		for(var i = 1; i < this.state.timeItems.length; i++){
			const timeItem = this.state.timeItems[i];
			console.log(parseInt(timeItem.hours));
			currentHours = Math.abs(currentHours - parseInt(timeItem.hours));
			currentMinutes = Math.abs(currentMinutes - parseInt(timeItem.minutes));
			currentSeconds = Math.abs(currentSeconds - parseInt(timeItem.seconds));
		}
		// const cleanTime = cleanData(totalHours, totalMinutes, totalSeconds);
		var carryMinutes = 0;
		var carryHours = 0;

		while(currentSeconds > 60) {
			currentSeconds = currentSeconds - 60;
			carryMinutes++;
		}
		
		currentMinutes = currentMinutes + carryMinutes;

		while(currentMinutes > 60){
			currentMinutes = currentMinutes - 60;
			carryHours++;
		}

		currentHours = currentHours + carryHours;

		this.setState({totalHours: currentHours});
		this.setState({totalMinutes: currentMinutes});
		this.setState({totalSeconds: currentSeconds});
		this.setState({submitted: true});

	}


	clearItems(e){

		var timeItems = [];
		for(var i = 0; i < this.state.timeItems.length; i++){
			var timeItem = {key: i, hours: 0, minutes: 0, seconds: 0};
			timeItem.push(timeItem);
		}

		this.setState({timeItems});
		this.setState({submitted: false});
		e.preventDefault();
	}

	handleTimeOptionChange(e){
		console.log(e.target.value);
		this.setState({timeOption: e.target.value});
	}

	render() {

		if(!this.state.submitted){

			return (
				<form>
					<div>
						<div>
						{this.state.timeItems.map((timeItem) => (
							<div className="timeItem" key={timeItem.key}>
								<label>Hours</label>
								<input type="number" name="hours" placeholder="0" value={timeItem.hours} onChange={e => this.handleChange(timeItem.key, e)}/>
								<label>Minutes</label>
								<input type="number" name="minutes" placeholder="0" value={timeItem.minutes} onChange={e => this.handleChange(timeItem.key, e)}/>
								<label>Seconds</label>
								<input type="number" name="seconds"  placeholder="0" value={timeItem.seconds} onChange={e => this.handleChange(timeItem.key, e)}/>
							</div>
						))}
						</div>
						<label className="radio-label">
							<input type="radio" value="add" checked={this.state.timeOption === "add"} onChange={this.handleTimeOptionChange}/> 
							Add
						</label>
						<label className="radio-label">
							<input type="radio" value="subtract" checked={this.state.timeOption === "subtract"} onChange={this.handleTimeOptionChange} />
							Subtract
						</label>
					</div>
					<button className="btn" type="button" onClick={this.calculateTime}>Calculate Time</button>
					<button className="btn" onClick={this.addTimeItem}>Add Time Item</button>
					<button className="btn" onClick={this.clearItems}>Clear All</button>
				</form>
				
			)

		}
		else{

			return (
				<div>
					<form>
						{this.state.timeItems.map((timeItem) => (
							<div className="timeItem" key={timeItem.key}>
								<label>Hours</label>
								<input type="text" name="hours" placeholder="0" value={timeItem.hours} onChange={e => this.handleChange(timeItem.key, e)}/>
								<label>Minutes</label>
								<input type="text" name="minutes" placeholder="0" value={timeItem.minutes} onChange={e => this.handleChange(timeItem.key, e)}/>
								<label>Seconds</label>
								<input type="text" name="seconds"  placeholder="0" value={timeItem.seconds} onChange={e => this.handleChange(timeItem.key, e)}/>
							</div>
						))}
						<button className="btn" type="button" onClick={this.calculateTime}>Calculate Time</button>
						<button className="btn" onClick={this.addTimeItem}>Add Time Item</button>
						<button className="btn" onClick={this.clearItems}>Clear All</button>
					</form>
					<div>
						<label>{this.state.totalHours} Hour(s) </label>
						<label>{this.state.totalMinutes} Minute(s) </label>
						<label>{this.state.totalSeconds} Second(s)</label>
					</div>
				</div>
			)

		}

	}

	

}



export default TimeForm;