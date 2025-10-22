# What is this

I wrote a [blog post](https://meowni.ca/posts/rl-with-otters) explaning what Reinforcement Learning is, and this demoes one RL algorithm called Q-Learning.

## What's in here
If you want to understand how this works, here's what's in each file.

### `state-machine.js`
This represents a generic environment, that's made up of states. You can
transition between these states with actions, and after each transition you
receive a reward. You probably don't really want to change this file.

## `gridworld.js`
This is a particular kind of state machine, which is just a grid of 10x10
cells, with a goal state. You might want to edit this file if you want to change the world -- maybe add some dangerous lava spots that should be avoided,  etc.

## `q-learner.js`
This is the agent that learns how to navigate in the environment, using
an algorithm called Q-learning. You might want to play around in here and see
what happens when you change the magic numbers in the algorithm (the step size or the learning rate)
