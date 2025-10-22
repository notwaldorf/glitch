/******************************
 In Reinforcement Learning, we train agents to learn
 from a particular state what actions are the best, so 
 that overall they profit.
 
 Q-learning is an algorithm that teaches the agent a value function 
 usually written Q(s,a). This is the value of taking an action from a state. 
 For example, if you're at the edge of the cliff and you go forward you die, 
 so you should learn pretty quickly that's a very expensive action that you
 should never take.
 
 The idea is that if you take enough steps to see the whole world, 
 and you take all actions from those steps, eventually you'll learn what
 to do in every step.
 ******************************/

class QLearner {
  constructor(world) {
    // Algorithm configuration. Won't lie, these numbers
    // are usually magic, and take trying out different values
    // before you settle on good ones
    this.alpha = 0.4;    // step size (how much progress we're actually making)
    this.epsilon = 0.2;  // probabily of taking a random action instead of the optimal one
    this.gamma = 0.8;    // discount rate. it trades off the importance of sooner vs later rewards.
    
    this.world = world;
    this.reset();
  }
  
  reset() {
    // The value function.
    this.Q = {};
    
    // Initialize Q(s, a)
    // for all states s, and possible actions from that state,
    // set everything to a random number except for the 
    // goal state. You want random numbers so that you
    // don't accidentally bias the "prior" knowledge.
    for (let s = 0; s < this.world.states.length; s++) {
      const transitions = this.world.transitions[s];
      this.Q[s] = {};
      for (let a in transitions) {
        const transition = transitions[a]
        // Goal state?
        if (transition.toState.id === this.world.goalState) {
          this.Q[s][transition.action.id] = 0;
        } else {
          this.Q[s][transition.action.id] = Math.random();
        }
      }
    }
  }
  
  train(steps = 10000) {
    // Initialize S: Pick a random starting state.
    this.currentState = this.world.pickRandomState();
    this._sequence = [];
    
    // Take steps until you reach the goal.
    while (steps--) {
      this.currentState = this.step(this.currentState);
      // For debugs, if you want to see what's happening.
      this._sequence.push(this.currentState);
      
      if (this.currentState === this.world.goalState) {
        console.log('goal reached in training, restarting');
        this.currentState = this.world.pickRandomState();
        this._sequence = [];
      }
    }
  }
  
  step(state) {
    // Choose the best action from this state according to the policy.
    const bestAction = this.pickEpsilonGreedyAction(this.Q[state]);

    // Take the action A, and get a reward R and the next state S'.
    const actionName = this.world.actions[bestAction].name;
    const transition = this.world.transitions[state][actionName];
  
    // Update the value function according to this formula:
    // Q(S, A) = Q(S, A) + α[R + γ max_a Q(S', a) − Q(S, A)]
    // This basically means that if this action is good, then the next action
    // we can take after this should put us in a better place
    // in the world than where we are right now. If it doesn't,
    // then this action isn't good.
    // That's how you get to the goal!
    const bestActionForNextState = this.pickBestAction(this.Q[transition.toState.id]);
    const bestValueOfNextAction = this.Q[transition.toState.id][bestActionForNextState]
    
    // If we pretend our policy is optimal, then we can calculate what we should
    // make if we follow this policy at the next step.
    const learntReward = transition.reward + this.gamma * bestValueOfNextAction;
    // Remember: gamma trades off the importance of sooner versus later rewards.
    // This is the difference between the value of our place in the world and now.
    
    const stepValue = this.alpha * (learntReward - this.Q[state][bestAction]) 
    this.Q[state][bestAction] += stepValue; 
    
    // Go to the next state.
    //this.alpha -= 0.001;
    return transition.toState.id;
  }
  
  // The best action from each state.
  policy() {
    let policy = {};
    for (let s in this.Q) {
      policy[s] = this.pickBestAction(this.Q[s]);
    }
    return policy;
  }
  
  // Epsilon-greedy means that most of the time we pick the 
  // best action (we are "greedy"), but with epsilon probability we pick a 
  // random action
  pickEpsilonGreedyAction(values) {
    const randomNumber = Math.random();
    if (randomNumber < this.epsilon) {
      const actions = Object.keys(values);
      return actions[Math.floor(Math.random() * (actions.length-1))];
    } else {
      return this.pickBestAction(values);
    }
  }
  
  pickBestAction(values) {
    let highestValue = -1;
    let bestAction = -1;
    for (let action in values) {
      if (values[action] > highestValue) {
        highestValue = values[action];
        bestAction = action;
      }
    }
    return bestAction;
  }
}

