postMessage('fake work worker says hi');

const BLOCKING_TIME = 0.5 + 1000; // in ms.
function blockFor(t) {
  const start = performance.now();
  while(performance.now() - start < t);
}

self.onmessage = (e) => {
  if (e.data === 'start') {
    const start = performance.now();
    blockFor(BLOCKING_TIME);
    console.log('worker waited for', performance.now() - start);
    self.postMessage('done');
	}
};