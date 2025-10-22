::part ::theme shim demo
======

limitations:
- this shim is meant for a demo prototype of the (still in the works) API. it is a very very very very rough shim, which means its performance is badly in the weeds (don't use it in production. don't use it for anything you care about)
- it probably has bugs and doesn't implement the spec 100%, and nobody will fix these bugs. Again, this shim wasn't ever meant to be used for realsies
- the shim is implemented as a mixin, which means you can only use `::part` or `::theme` inside of a custom element using that mixin (see `another-form.js`)
