Different kinds of metronomes
=================

We all know that `setInterval` is not super accurate, but I wanted
to see how this would actually affect in practice audio scheduling (like a metronome).
I made three kinds of metronomes, in order of goodness:
      
- using `setInterval()`
- using `setInterval()` in a worker
- prescheduling audio events