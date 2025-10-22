// I've separated these styles up because they're complicated
// and I want to see the custom element dom clearly.
export const colors = `
.fg-white { color: white; }
.bg-white { background-color: white; color: black; }
.bg-pink { background-color: var(--pink); color: black; }
.fg-pink { color: var(--pink); }
.bg-pink-light { background-color: var(--pink-light); color: black; }
.fg-pink-light { color: var(--pink-light); }
.bg-coral { background-color: var(--coral); color: black; }
.fg-coral { color: var(--coral); }
.bg-blue { background-color: var(--blue);  color: black; }
.fg-blue { color: var(--blue); }
.bg-blue-dark { background-color: var(--blue-dark); }
.fg-blue-dark { color: var(--blue-dark); }
.bg-yellow { background-color: var(--yellow);  color: black; }
.fg-yellow { color: var(--yellow); }
.bg-orange { background-color: var(--orange);  color: black; }
.fg-orange { color: var(--orange); }
.bg-purple { background-color: var(--purple); color: black; }
.fg-purple { color: var(--purple); }
.bg-green { background-color: var(--green);  color: black; }
.fg-green { color: var(--green); }
.grad-purple { background: linear-gradient(to right, var(--purple), var(--blue)); }
.grad-blue { background: linear-gradient(to right, var(--green), var(--blue)); }
.grad-pink { background: linear-gradient(to right, var(--pink), var(--purple)); }
.grad-green { background: linear-gradient(to right, var(--green), var(--yellow)); color: black;}
.grad-coral { background: linear-gradient(to right, var(--yellow), var(--coral)); color: black;}

/* for the flat kind of boxes */
.shadow-pink { box-shadow: 20px 20px 0 var(--pink); }
.shadow-pink-light { box-shadow: 20px 20px 0 var(--pink-light); }
.shadow-coral { box-shadow: 20px 20px 0 var(--coral); }
.shadow-blue { box-shadow: 20px 20px 0 var(--blue); }
.shadow-blue-dark { box-shadow: 20px 20px 0 var(--blue-dark); }
.shadow-yellow { box-shadow: 20px 20px 0 var(--yellow); }
.shadow-orange { box-shadow: 20px 20px 0 var(--orange); }
.shadow-purple { box-shadow: 20px 20px 0 var(--purple); }
.shadow-green { box-shadow: 20px 20px 0 var(--green); }
`

export const panelStyles = `
.panel-l {
  position: absolute;
  top: 12px;
  right: calc(100% + 8px);
  z-index: 1;
  overflow: hidden;
  margin-top: 0;
  width: 40px;
  height: calc(100% + 17px);
  border: 8px solid #000;
  border-top-width: 12px;
  border-right: 0;
  border-bottom-width: 6px;
  border-bottom-left-radius: 2px;
  content: "";
  transform: skewY(-45deg);
}

.panel-l::after {
  position: absolute;
  top: -16px;
  right: 0;
  bottom: -16px;
  left: 0;
  content: "";
  transform: skewY(45deg);
}

.panel-b-l {
  border-left-width: 7px;
  position: absolute;
  top: calc(100% + 8px);
  right: 12px;
  z-index: 1;
  overflow: hidden;
  margin-top: 0;
  width: calc(100% + 17px);
  height: 40px;
  border: 8px solid black;
  border-top: 0;
  border-top-width: 0;
  border-right-width: 12px;
  border-bottom-left-radius: 2px;
  content: "";
  transform: skewX(-45deg);
}

.panel-b-l::after {
  position: absolute;
  top: 0;
  right: -16px;
  bottom: 0;
  left: -20px;
  width: calc(100% + 50px);
  content: "";
  transform: skewX(45deg);
}

.panel-r {
  position: absolute;
  top: 12px;
  left: calc(100% + 8px);
  z-index: 1;
  overflow: hidden;
  margin-top: 0;
  width: 40px;
  height: calc(100% + 17px);
  border: 8px solid #000;
  border-top-width: 12px;
  border-left: 0;
  border-bottom-right-radius: 2px;
  content: "";
  transform: skewY(45deg);
}

.panel-r::after {
  position: absolute;
  top: -16px;
  right: 0;
  bottom: -16px;
  left: 0;
  content: "";
  transform: skewY(-45deg);
}

.panel-b-r {
  border-right-width: 7px;
  position: absolute;
  top: calc(100% + 8px);
  left: 12px;
  z-index: 1;
  overflow: hidden;
  margin-top: 0;
  width: calc(100% + 17px);
  height: 40px;
  border: 8px solid black;
  border-top-width: 0;
  border-right-width: 6px;
  border-left-width: 11px;
  border-bottom-right-radius: 2px;
  content: "";
  transform: skewX(45deg);
}

.panel-b-r::after {
  position: absolute;
  top: 0;
  right: -20px;
  bottom: 0;
  left: -16px;
  content: "";
  transform: skewX(-45deg);
}

.dots::after {
  background-color: white;
  background-image: radial-gradient(var(--pink) 26%, transparent 40%);
  background-position: 1px 1px;
  background-size: 10px 10px;
}

.dots2::after {
  background-color: white;
  background-image: radial-gradient(var(--purple) 26%, transparent 40%);
  background-position: 1px 1px;
  background-size: 10px 10px;
}

.dashes::after {
  background-image: repeating-linear-gradient(-90deg, var(--blue), var(--blue) 7px, white 7.1px, white 14px, white 14px);
  transform: skewY(0deg);
}

.dashes2::after {
  background-image: repeating-linear-gradient(-90deg, var(--yellow), var(--yellow) 7px, var(--pink) 7.1px, var(--pink) 14px, var(--pink) 14px);
  transform: skewY(0deg);
}
`;
