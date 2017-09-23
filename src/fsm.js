class FSM {

  constructor(config) {
    this.initObject = config;
	this.currentState = config.initial;
	this.states = config.states;
	this.history = [];
	this.index = 0;
				
  }

  getState() {
    return this.currentState;
  }

  changeState(state) {
	if (this.states[state]){
      this.currentState = state;
	  this.history.splice(this.index + 1);
	  this.history.push(this.currentState);
	  this.index++;
	} else {
	  throw Error();
	}
  }

  trigger(event) {
    if (this.states[this.currentState].transitions[event]){
	  this.currentState = this.states[this.currentState].transitions[event];
	  this.history.splice(this.index + 1);
	  this.history.push(this.currentState);
	  this.index++;
	} else {
	  throw Error();
	}		
  }

  reset() {
    this.currentState = this.initObject.initial;
	}

  getStates(event) {
    let allStates = Object.keys(this.states);
	
	if (arguments.length){
	  return allStates.filter(val => this.states[val].transitions.hasOwnProperty(event));	
	} else {
	  return allStates;
	}
  }

  undo() {
	if(this.history.length && this.index >= 1){
	 if (this.index === 1) {
	  this.currentState = this.initObject.initial;
		this.index--;
		return true;
	  }
		 
	  this.currentState = this.history[--this.index];
	  return true;
	}else {
	  return false;
	}
  }

  redo() {
    if (this.history.length && this.history.length > this.index) {
	  this.currentState = this.history[this.index++];  
		 return true;  
	  } else {
		  return false;
	  }
	}

  clearHistory() {
    this.history = [];
  }
}

module.exports = FSM;
