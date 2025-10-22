import {SetIntervalMetronome, WorkerMetronome, ScheduledMetronome} from './metronome.js';

let points = [[],[],[],[]];
let metronome;

document.getElementById('btnPlain').onclick = () => start(0);
document.getElementById('btnWorker').onclick = () => start(1);
document.getElementById('btnPrescheduled').onclick = () => start(2);
document.getElementById('btnStop1').onclick = () => stop();
document.getElementById('btnStop2').onclick = () => stop();
document.getElementById('tempoInput1').oninput = () => document.getElementById('tempoInput2').value = document.getElementById('tempoInput1').value;
document.getElementById('tempoInput2').oninput = () => document.getElementById('tempoInput1').value = document.getElementById('tempoInput2').value;
document.getElementById('btnRunExperiment1').onclick = () => runExperiment(1);
document.getElementById('btnRunExperiment2').onclick = () => runExperiment(2);
document.getElementById('btnRunExperiment3').onclick = () => runExperiment(3);
document.getElementById('btnRunExperiment4').onclick = () => runExperiment(4);

async function start(whichMetronome, pointlessWorkFn) {
  return new Promise((resolve, reject) => {
    const TEMPO = parseFloat(document.getElementById('tempoInput1').value);
    const CLICKS = parseFloat(document.getElementById('clicksInput').value);
  
    document.querySelector('.demo1').setAttribute('disabled', false);
    document.querySelector('.demo2').setAttribute('disabled', false);
    points[whichMetronome] = [];
    if (whichMetronome === 2) points[3] = [];
    let prev = 0, prevClockTime = 0;
    let i = 0;
    switch(whichMetronome) {
      case 0:
        metronome = new SetIntervalMetronome(TEMPO);
        break;
      case 1:
        metronome = new WorkerMetronome(TEMPO);
        break;
      case 2:
        metronome = new ScheduledMetronome(TEMPO, CLICKS);
        break;
    }
    
    metronome.start((t) => {
      points[whichMetronome].push(t - prev);
      if (whichMetronome === 2) {
        points[3].push(metronome.audioCtx.currentTime - prevClockTime);
        prevClockTime = metronome.audioCtx.currentTime;
      }
      i++;
      if (pointlessWorkFn) {
        document.getElementById('message2').textContent = `Running... Difference between clicks (${i}/${CLICKS}): ${t - prev}`;
      } else {
        document.getElementById('message1').textContent = `Running... Difference between clicks (${i}/${CLICKS}): ${t - prev}`;
      }
      
      prev = t;
      
      if (pointlessWorkFn) {
        pointlessWorkFn();
      }
        
      if (points[whichMetronome].length === CLICKS) {
        metronome.stop();
        document.querySelector('.demo1').removeAttribute('disabled');
        document.querySelector('.demo2').removeAttribute('disabled');
        
        if (pointlessWorkFn) {
          document.getElementById('message2').textContent = 'Done!';
        } else {
          document.getElementById('message1').textContent = 'Done!';
        }
        
        plotGraph();
        resolve(whichMetronome);
      }
    });
  });
}

function plotGraph() {
  window.Plotly.purge(document.getElementById('graph'));
  document.getElementById('graphTitle').hidden = false;
  window.Plotly.plot(document.getElementById('graph'), [
    {y:points[0], name: 'setInterval()', color: 'red'}, 
    {y:points[1], name: 'setInterval() in a worker', color: 'hotpink'},
    {y:points[2], name: 'prescheduled, the scheduled time', color: 'blue'},
    {y:points[3], name: 'prescheduled, the callback time', color: 'aquamarine'}
    ]);
}

function stop() {
  metronome.stop();
  document.getElementById('message1').textContent = 
    document.getElementById('message2').textContent = 
    'Press start, or check the graph below to see your results.';
  document.querySelector('.demo1').removeAttribute('disabled');
  document.querySelector('.demo2').removeAttribute('disabled');
  
  plotGraph();
}


async function runExperiment(experimentIndex) {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  window.Plotly.purge(document.getElementById('graph'));
  document.getElementById('graphTitle').hidden = true;
  
  let pointlessWork = () => {};
  if (experimentIndex === 2) pointlessWork = doPointlessBlockingComputations;
  if (experimentIndex === 3) pointlessWork = doPointlessComputationsInRaf;
  if (experimentIndex === 4) pointlessWork = doPointlessComputationsInWorker;

  await start(0, pointlessWork);  
  document.getElementById('message2').textContent = 'Waiting for 3s...';
  await delay(2000);
  
  await start(1, pointlessWork);
  document.getElementById('message2').textContent = 'Waiting for 3s...';
  await delay(2000);
  
  await start(2, pointlessWork);
}

const BLOCKING_TIME = 0.5 + 1000; // in ms.

function doPointlessBlockingComputations() {
  blockFor(BLOCKING_TIME);
  console.log('done fake work');
}

function doPointlessComputationsInRaf() {
  const chunks = 100;
  requestAnimationFrame(() => nextOne(0));
  
  function nextOne(i) {
    if (i === chunks) {
      console.log('done fake work');
      return;
    }
    blockFor(BLOCKING_TIME/chunks);
    window.requestAnimationFrame(() => nextOne(i + 1));
  }
}

function doPointlessComputationsInWorker() {
  const worker = new Worker('fake-work-worker.js');
  
  worker.onmessage = () => console.log('done fake work'); 
  worker.postMessage('start');
}

function blockFor(t) {
  const start = performance.now();
  while(performance.now() - start < t);
}