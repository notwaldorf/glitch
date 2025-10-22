/* SetInterval in a worker to see if
  it's different than on the main thread */

postMessage('worker says hi');

let interval = 1000;
let timeoutId;

self.onmessage = (e) => {
  if (e.data.interval) {
		interval = e.data.interval;
  } else if (e.data === 'start') {
		timeoutId = setInterval(() => postMessage('tick'), interval);
	}
	else if (e.data === 'stop') {
		clearInterval(timeoutId);
	}
};