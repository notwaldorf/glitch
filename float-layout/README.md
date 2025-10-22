# How browsers position floats

When you have a `float` CSS property on a box (with a value different than `none`), this box
must be laid out according to the **float positioning algorithm**. Loosely, it says:

- if the box has `float:left`, the box is positioned at the beginning of the line box
- if the box has `float:right`, the box is positioned at the end of the line box
- text (and more generally anything within the normal, non-floaty flow) is laid out along the edges of the floating boxes
- the `clear` property changes the floating behaviour.

Anyway, in general you'll have a better time if you use a flexbox or CSS grid instead of floats, because floats are quirky and have strange edge cases, but if you were ever curious
about how the algorithm would choose where to position different floats, this is an interactive demo.