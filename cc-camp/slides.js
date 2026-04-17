const total = document.querySelectorAll('.slide').length;

let current = 1;

function getSlideFromURL() {
  const params = new URLSearchParams(window.location.search);
  const s = parseInt(params.get('slide'), 10);
  return (s >= 1 && s <= total) ? s : 1;
}

function getIntAsString(i) {
  return (i < 10) ? `0${i}` : `${i}`;
}

function setSlide(n, pushState) {
  document.getElementById('slide-' + current).classList.remove('active');
  current = n;
  document.getElementById('slide-' + current).classList.add('active');
  
  document.getElementById('counter').textContent = `SLIDE ${getIntAsString(current)} OF ${getIntAsString(total)} `
  
  document.getElementById('prev-btn').disabled = current === 1;
  document.getElementById('next-btn').disabled = current === total;
  document.getElementById('progress').style.width = (current / total * 100) + '%';
 
  if (pushState) {
    const url = new URL(window.location);
    url.searchParams.set('slide', current);
    history.pushState({ slide: current }, '', url);
  }
}

function changeSlide(dir) {
  const next = current + dir;
  if (next >= 1 && next <= total) setSlide(next, true);
}

window.addEventListener('popstate', function(e) {
  if (e.state && e.state.slide) setSlide(e.state.slide, false);
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'ArrowLeft') changeSlide(-1);
});

document.addEventListener('DOMContentLoaded', function() {
  const start = getSlideFromURL();
  current = start;
  document.getElementById('slide-' + current).classList.add('active');
  document.getElementById('counter').textContent = `SLIDE ${getIntAsString(current)} OF ${getIntAsString(total)} `
  document.getElementById('prev-btn').disabled = current === 1;
  document.getElementById('next-btn').disabled = current === total;
  document.getElementById('progress').style.width = (current / total * 100) + '%';
  
  const url = new URL(window.location);
  url.searchParams.set('slide', current);
  history.replaceState({ slide: current }, '', url);

  document.getElementById('prev-btn').addEventListener('click', function() { changeSlide(-1); });
  document.getElementById('next-btn').addEventListener('click', function() { changeSlide(1); });
});