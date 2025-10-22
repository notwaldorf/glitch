/* 
 * Base metronome, with no timing. 
 * More like a "click on command" class. 
 */
class BaseMetronome {
  constructor(tempo = 60) {
    this.tempo = tempo;
    this.playing = false;
    
    this.audioCtx = null;
    this.tick = null;
    this.tickVolume = null;
    this.soundHz = 1000;
  }
  
  initAudio() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.tick = this.audioCtx.createOscillator();
    this.tickVolume = this.audioCtx.createGain();

    this.tick.type = 'sine'; 
    this.tick.frequency.value = this.soundHz;
    this.tickVolume.gain.value = 0;
    
    this.tick.connect(this.tickVolume);
    this.tickVolume.connect(this.audioCtx.destination);
    this.tick.start(0);  // No offset, start immediately.
  }
  
  click(callbackFn) {
    const time = this.audioCtx.currentTime;
    this.clickAtTime(time);
    
    if (callbackFn) {
      callbackFn(time);
    }
  }
  
  clickAtTime(time) {
    // Silence the click.
    this.tickVolume.gain.cancelScheduledValues(time);
    this.tickVolume.gain.setValueAtTime(0, time);

    // Audible click sound.
    this.tickVolume.gain.linearRampToValueAtTime(1, time + .001);
    this.tickVolume.gain.linearRampToValueAtTime(0, time + .001 + .01);
  }
  
  start(callbackFn) {
    this.playing = true;
    this.initAudio();
  }
  
  stop(callbackFn) {
    this.playing = false;
    this.tickVolume.gain.value = 0;
  }
}

/* 
 * Scheduling is done by calling setInterval() on the main thread.
 */
class SetIntervalMetronome extends BaseMetronome {
  constructor(tempo) {
    super(tempo);
    this.intervalId = null;
  }
  
  start(callbackFn) {
    super.start();
    const timeoutDuration = (60 / this.tempo) * 1000;
    this.intervalId = setInterval(() => this.click(callbackFn), timeoutDuration);
  }
  
  stop() {
    super.stop();
    clearInterval(this.intervalId);
  }
}

/* 
 * Scheduling is done by calling setInterval() in a worker thread.
 */
class WorkerMetronome extends BaseMetronome {
  constructor(tempo) {
    super(tempo);
    this.worker = new Worker('./worker.js');
  }
  
  start(callbackFn) {
    super.start();
    const timeoutDuration = (60 / this.tempo) * 1000;
    
    this.worker.postMessage({interval: timeoutDuration});
    this.worker.postMessage('start');
    this.worker.onmessage = () => this.click(callbackFn); 
  }
  
  stop() {
    super.stop();
    this.worker.postMessage('stop');
  }
}

/* 
 * Scheduling is done by prescheduling all the audio events, and
 * letting the WebAudio scheduler actually do the scheduling.
 */
class ScheduledMetronome extends BaseMetronome {
  constructor(tempo, ticks = 1000) {
    super(tempo);
    this.scheduledTicks = ticks;
  }
  
  start(callbackFn) {
    super.start();
    const timeoutDuration = (60 / this.tempo);
    
    let now = this.audioCtx.currentTime;
      
    // Schedule all the clicks ahead.
    for (let i = 0; i < this.scheduledTicks; i++) {
      this.clickAtTime(now);
      const x = now;
      setTimeout(() => callbackFn(x), now * 1000);
      now += timeoutDuration;
    }
  }
}

export {SetIntervalMetronome, WorkerMetronome, ScheduledMetronome};