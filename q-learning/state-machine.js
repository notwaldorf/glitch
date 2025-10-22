/******************************
 * State, actions, transitions
 ******************************/
class State {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

class Action {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

class Transition {
   constructor(fromState, action, toState, reward = 0) {
     this.action = action;
     this.fromState = fromState;
     this.toState = toState;
     this.reward = reward;
   }
}

/******************************
 * State Machine
 ******************************/
class StateMachine {
  constructor(states, actions) {
    this.states = states || [];
    this.actions = actions || [];
    this.transitions = {};
    this.goalState = 0;
  }
  
  addTransition(fromState, toState, action, reward) {
    let transitionsForState = this.transitions[fromState] || {};
    transitionsForState[this.actions[action].name] = new Transition(this.states[fromState], this.actions[action], this.states[toState], reward || 0);
    this.transitions[fromState] = transitionsForState;
  }
  
  takeStep(state, action) {
    // Can this state take this action?
    const transition = this.transitions[state][action];
    if (transition) {
      //console.log(`${transition.fromState.name} ${action} ${transition.toState.name}`);
      state = transition.toState.id;
    } else {
      console.log(`${this.states[state].name} ${action}🚫`);
    }
    return state;
  }
  
  takeRandomStep(state) {
    // Pick a random action from the available ones
    const availableTransitions = this.transitions[state];
    const availableActions = Object.keys(availableTransitions)
    const action = availableActions[this.pickRandomNumber(availableActions.length)];
    return this.takeStep(state, action);
  }
  
  pickRandomNumber(num) {
    return Math.floor(Math.random() * num);
  }
  
  pickRandomState() {
    return this.pickRandomNumber(this.states.length);
  }
}