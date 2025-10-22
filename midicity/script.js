const url = "https://cdn.glitch.com/6956048d-53f0-46bf-9350-20e59b1d4f90%2Falladin-short.mid?1553050573627";
const player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
// Colors from Susie Lu and https://projects.susielu.com/viz-palette.
const colors = ['#ffd700', '#ffb14e', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff'];

let initialSong, yourSong;
let firstTimesACharm = true;
let numSequences = 0;
const config = {minSequenceLength: 5, delta: 0.1, maxSequenceLength: 200};

// Event listeners.
inputDensity.addEventListener('change', () => {
  config.delta = 1 - parseFloat(inputDensity.value);
  crunch();
});
inputRows.addEventListener('change', () => {
  config.minSequenceLength = config.maxSequenceLength - parseFloat(inputRows.value);
  crunch();
});
btnLoad.addEventListener('change', (e) => mm.blobToNoteSequence(e.target.files[0]).then(ready));
btnSave.addEventListener('click', () => saveAs(new File([mm.sequenceProtoToMidi(yourSong)], 'your-city.mid')));
btnPlay.addEventListener('click', playOrPause);

function go() {
  document.getElementsByClassName('splash')[0].hidden = true;
  document.getElementsByClassName('neighbourhood')[0].hidden = false;
  mm.urlToNoteSequence(url).then(ready);
}

function ready(ns) {
  initialSong = ns;
  firstTimesACharm = true;
  crunch();
}

function crunch() {
  const notesByInstrument = {};
  for (let i = 0; i < initialSong.notes.length; i++) {
    const note = initialSong.notes[i];
    if (notesByInstrument[note.instrument] === undefined)
      notesByInstrument[note.instrument] = [];
    notesByInstrument[note.instrument].push(note);
  }
  graph(Object.values(notesByInstrument), Math.ceil(initialSong.totalTime));
}

function graph(data, totalTime) {
  const margin = {top: 0, right: 20, bottom: 0, left: 20};
  const width = window.innerWidth - margin.right - margin.left;
  const height = window.innerHeight / 2;

  const xScale = d3.scaleLinear().domain([0, totalTime]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 127]).range([height, 0]);

  // Setup.
  const svg = d3.select('#city');
  svg.selectAll('*').remove();
  svg.attr('width', width + margin.left + margin.right)
     .attr('height', height + margin.top + margin.bottom);
  const group = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Line path.
  const line = d3.line()
      .x((d) => xScale(d.x))
      .y((d, i) => yScale(d.y))
      .curve(d3.curveMonotoneX);
  
  const [dataset, frankenNotes] = letsBuildThisCity(data);
  
  yourSong = JSON.parse(JSON.stringify(initialSong));  // Don't ruin the og song.
  if (firstTimesACharm) {
    firstTimesACharm = false;
  } else {
    yourSong.notes = frankenNotes;
    yourSong.totalTime = null;
  }
  player.loadSamples(yourSong);

  // Sort them by their first pitch.
  dataset.sort((d1,d2) => d1[0].y - d2[0].y);
  numSequences = dataset.length;

  const filter = group.append('defs').append('filter').attr('id','glowBig');
  filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur');
  const feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode').attr('in','coloredBlur');
  feMerge.append('feMergeNode').attr('in','SourceGraphic');

  // One line per series.
  for (let n = 0; n < dataset.length; n++) {
    group.append('path').datum(dataset[n])
      .attr('class', 'line')
      .attr('transform', `translate(0, ${n * 10})`)
      .attr('d', line)
      .attr('stroke', colors[n])
      .attr('fill', d3.schemeAccent[n])
      .attr('fill-opacity', 1 - n / numSequences)
      .attr('stroke-opacity', 1)
      .style('filter' , (n < numSequences/2) ? 'none' : 'url(#glowBig)')
  }
}

// Look. This function isn't pretty.
function letsBuildThisCity(data) {
  let pointsWeKept = [], notesWeKept = [];
  for (let i = 0; i < data.length; i++) {
    const points = [];
    const notes = [];
    let previousPoint = {x: 0, y: data[i][0].pitch};
    for (let j = 0; j < data[i].length; j++) {
      // No overapping notes. No super short notes. No pitches below the horizon line (the first pitch).
      if ((data[i][j].startTime >= previousPoint.x) &&
          (data[i][j].endTime - data[i][j].startTime >= config.delta) &&
          (data[i][j].pitch >= data[i][0].pitch)) {
        // We want straight lines only, so always match to the previous point.
        points.push({x: data[i][j].startTime.toFixed(2), y: previousPoint.y});
        points.push({x: data[i][j].startTime.toFixed(2), y: data[i][j].pitch});
        points.push({x: data[i][j].endTime.toFixed(2), y: data[i][j].pitch});
        previousPoint = {x: data[i][j].endTime, y: data[i][j].pitch};
        notes.push(JSON.parse(JSON.stringify(data[i][j])));  // It's a keeper.
      } 
    }
    // At the end, end with the same point so that the bottom edge is nice.
    if (points.length > 0) {
      points.push({x:points[points.length-1].x, y:points[0].y});
      pointsWeKept.push(points);
      notesWeKept.push(notes);
    }
  }

  // Ok they're still not all keepers. Throw away the remaining super short lines.
  const dataset = [], frankenNotes = [];
  let previousInstrument = 0; // to convert to midi all instruments must be in a series.
  for (let i = 0; i < pointsWeKept.length; i++) {
    // Can't be too short.
    if (pointsWeKept[i].length < config.minSequenceLength) continue;
    // Can't be a straight line.
    const unique = [...new Set(pointsWeKept[i].map(item => item.y))];
    if (unique.length < 2) continue;
    dataset.push(pointsWeKept[i]);
    // Make all the instruments consecutive or else we can't save this.
    notesWeKept[i].forEach((n) => n.instrument = previousInstrument);
    previousInstrument++;
    frankenNotes.push(...notesWeKept[i]);
  }
  return [dataset, frankenNotes];
}

function playOrPause(event) {
  if (player.isPlaying()) {
    player.stop();
    event.target.textContent = 'play';
  } else {
    player.start(yourSong);
    event.target.textContent = 'stop';
  }
}