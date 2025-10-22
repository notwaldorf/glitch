// This is a particular kind of state machine, which is 
// a grid that lets you move in all directions.
class Gridworld extends StateMachine {
  constructor(size) {
    super();
    this.reset();
    this.init(size);
  }
  
  reset() {
    this.currentState = 0;
    this.goalState = 76;  
    this.score = 0;
    this.totalSteps = 1;
    this._running = false;
    this.policy = null;
  }
  
  start(slow = false) {
    this._running = true;
    this._run(slow);
  }
  
  stop() {
    this._running = false;
    clearTimeout(this._timer);
  }
  
  _run(slow = false) {
    this.totalSteps++;
    this.doStep();
    if (this._running) {
      this._timer = setTimeout(() => this._run(slow), slow ? 500 : 0);
    }
  }
  
  doStep() {
    // If we've learned a policy, use that, otherwise
    // just take a random step
    if (this.policy) {
      const bestAction = this.policy[this.currentState];
      const actionName = this.actions[bestAction].name;
      this.currentState = this.takeStep(this.currentState, actionName);
    } else {
      this.currentState = this.takeRandomStep(this.currentState);
    }
  
    if (this.currentState === this.goalState) {
      this.score++;
      // Start in a random state to make it interesting.
      this.currentState = this.pickRandomState();
    }
    document.dispatchEvent(new CustomEvent('did-step'));
  }
  
  init(size) {
    this.actions = [new Action('⬆️', 0), new Action('⬇️', 1), new Action('⬅️', 2), new Action('➡️', 3)];
    
    // States
    for (let i = 0; i < size * size; i++) {
      this.states.push(new State(`s${i}`, i));
    }
    
    for (let i = 0; i < this.states.length; i++) {
      for (let j = 0; j < this.states.length; j++) {
        const reward = (j === this.goalState) ? 1 : 0;
        
        // i ⬆️ j (and it doesn't go in the negatives)
        if (i - j === size) {
          this.addTransition(i, j, 0, reward);
        }
        // i ⬇️ j 
        if (j - i === size) {
          this.addTransition(i, j, 1, reward);
        }
        // i ⬅️ j (and it doesn't wrap on the previous row)
        if (i - j === 1 && (j % size !== size - 1)) {
          this.addTransition(i, j, 2, reward);
        }
        // i ➡️ j (and it doesn't wrap on the next row)
        if (j - i === 1 && (j % size !== 0)) {
          this.addTransition(i, j, 3, reward);
        }
      }
    }
  }
}